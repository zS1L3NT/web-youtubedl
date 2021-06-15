import express from "express"
import cors from "cors"
import ytdl from "ytdl-core"
import ytpl from "ytpl"
import path from "path"
import archiver from "archiver"
import ffmpeg from "fluent-ffmpeg"
import { v4 } from "uuid"

const app = express()
const PORT = 1902
ffmpeg.setFfmpegPath(require("@ffmpeg-installer/ffmpeg").path)

interface file {
	url: string
	name: string
}
interface cache {
	files: file[]
	format: "videoandaudio" | "audioonly"
}
const cache: { [id: string]: cache } = {}

app.use(cors())
app.use(express.json())
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "../views"))
app.use(express.static(path.join(__dirname, "..", "views")))

app.get("/video", (_req, res) => {
	res.render("index", { title: "Video", format: "videoandaudio" })
})

app.get("/audio", (_req, res) => {
	res.render("index", { title: "Audio (MP3)", format: "audioonly" })
})

app.get("/video-pl", (_req, res) => {
	res.render("index", { title: "Video Playlist", format: "videoandaudio" })
})

app.get("/audio-pl", (_req, res) => {
	res.render("index", { title: "Audio (WEBM) Playlist", format: "audioonly" })
})

app.post("/verify_name", (req, res) => {
	const name = req.body.name as string

	try {
		res.setHeader(
			"Content-Disposition",
			`attachment; filename="${name}.mp3"`
		)
		res.status(200).end()
	} catch (e) {
		res.status(400).send("Filename contains invalid characters")
	}
})

/**
 * Verify if a song URL is legal
 *
 * @param {string} url URL of the video
 * @return Song data from the server
 */
app.post("/verify_single", async (req, res) => {
	const url = req.body.url

	let info: ytdl.videoInfo
	let thumbnail = ""

	try {
		info = await ytdl.getInfo(url)

		const thumbnails = info.videoDetails.thumbnails
		thumbnail = thumbnails[thumbnails.length - 1].url
	} catch (e) {
		return res.status(400).send(
			"Error getting video title, please enter a proper YouTube URL"
		)
	}

	res.status(200).send({
		name: info.videoDetails.title,
		thumbnail,
		bitrate: info.formats[0].audioBitrate!
	})
})

/**
 * Verify if a playlist URL is legal
 *
 * @param {string} url URL of the playlist
 * @return {string[]} URLs of the songs in the playlist
 */
app.post("/verify_playlist", async (req, res) => {
	const url = req.body.url as string

	if (!url) {
		res.status(400).send("No URL provided!")
		return
	}

	try {
		const { items } = await ytpl(url)
		res.status(200).send(items.map(item => item.url))
	} catch (e) {
		res.status(400).send("URL provided is not a YouTube Playlist link!")
	}
})

/**
 * Caches a playlist data over POST
 * 
 * @param {file[]} files Files to cache
 * @param {"videoandaudio" | "audioonly"} format Format of the files
 * @return ID of the cache
 */
app.post("/cache_playlist_data", async (req, res) => {
	const { files, format } = req.body as {
		files: file[]
		format: "videoandaudio" | "audioonly"
	}

	if (files.length < 1) {
		res.status(400).send("Cannot download 0 files")
		return
	}

	for (let i = 0, il = files.length; i < il; i++) {
		const file = files[i]
		try {
			res.setHeader(
				"Content-Disposition",
				`attachment; filename="${file.name}.mp3"`
			)
		} catch (e) {
			return res.status(400).send(`Filename ${file.name} contains invalid characters`)
		}
	}

	const id = v4()
	cache[id] = {
		files,
		format
	}

	setTimeout(() => {
		delete cache[id]
	}, 3600000)

	res.status(200).send(id)
})


/**
 * Download a playlist depending on the format
 * 
 * @param {string} id ID of the cache
 * @pipe ZIP to download
 */
app.get("/download_playlist", (req, res) => {
	const { id } = req.query as { id: string }

	const data = cache[id]
	if (!data) {
		res.status(404).send("Data expired or was never created")
		return
	}

	const archive = archiver("zip", { zlib: { level: 9 } })
	archive.on("error", err => {
		res.status(500).send({ error: err.message })
	})

	res.attachment("music-files.zip")
	archive.pipe(res)

	for (let i = 0, il = data.files.length; i < il; i++) {
		const { url, name } = data.files[i]

		const filename =
			name.replace(/[\\\/]/g, " ") +
			(data.format === "audioonly" ? ".webm" : ".mp4")

		try {
			archive.append(
				ytdl(url, {
					filter: data.format,
					quality: "highest"
				}),
				{ name: filename }
			)
		} catch (e) {
			console.trace(e.message)
			return res.status(500).send("Error zipping files on server")
		}
	}

	archive.finalize()
})

/**
 * Download a single video depending on the format
 *
 * @param {string} url YouTube URL of the video
 * @param {"videoandaudio" | "audioonly"} format Format of the video
 * @param {string} name Name of the file to save it as
 * @param {string} bitrate Bitrate as a string of the file
 * @pipe The file to download
 */
app.get("/download_single", (req, res) => {
	const {
		url,
		format,
		name,
		bitrate: bitrate_
	} = req.query as {
		url: string
		format: "videoandaudio" | "audioonly"
		name: string
		bitrate: string
	}

	if (!url || !format || !name || !bitrate_) {
		return res.status(400).send("Missing items in URL")
	}

	const bitrate = parseInt(bitrate_)
	if (isNaN(bitrate)) {
		return res.status(400).send("Bitrate must be a number")
	}

	try {
		res.setHeader(
			"Content-Disposition",
			`attachment; filename="${name}.${
				format === "audioonly" ? "mp3" : "mp4"
			}"`
		)
		const stream = ytdl(url, {
			filter: format,
			quality: "highest"
		})

		if (format === "videoandaudio") {
			stream.pipe(res)
		} else {
			ffmpeg(stream)
				.audioBitrate(bitrate)
				.withAudioCodec("libmp3lame")
				.toFormat("mp3")
				.pipe(res)
		}
	} catch (e) {
		console.log("Caught error:", e.message)
		res.status(400).send(e.message)
	}
})

app.get("*", (_req, res) => res.redirect("/audio"))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
