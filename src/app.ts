import express from "express"
import cors from "cors"
import ytdl from "ytdl-core"
import ytpl from "ytpl"
import path from "path"
import archiver from "archiver"
import { v4 } from "uuid"

const app = express()
const PORT = 1902

const cache: {
	[id: string]: {
		files: {
			url: string
			name: string
		}[]
		format: "videoandaudio" | "audioonly"
	}
} = {}

app.use(cors())
app.use(express.json())
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "../views"))
app.use(express.static(path.join(__dirname, "..", "views")))

app.get("/video", (_req, res) => {
	res.render("index", { title: "Video", format: "videoandaudio" })
})

app.get("/audio", (_req, res) => {
	res.render("index", { title: "Audio", format: "audioonly" })
})

app.get("/video-pl", (_req, res) => {
	res.render("index", { title: "Video Playlist", format: "videoandaudio" })
})

app.get("/audio-pl", (_req, res) => {
	res.render("index", { title: "Audio Playlist", format: "audioonly" })
})

app.post("/verify_name", (req, res) => {
	let { name } = req.body as {
		name: string
	}

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

app.post("/verify_video", async (req, res) => {
	const { url, format } = req.body as {
		url: string
		format: "videoandaudio" | "audioonly"
	}

	let name = ""
	let thumbnail = ""
	try {
		const info = await ytdl.getInfo(url)
		name = info.videoDetails.title

		const thumbnails = info.videoDetails.thumbnails
		thumbnail = thumbnails[thumbnails.length - 1].url
	} catch (e) {
		res.status(400).send(
			"Error getting video title, please enter a proper YouTube URL"
		)
		return
	}

	try {
		ytdl(url, {
			filter: format,
			quality: "highest"
		}).pipe(res)
		res.status(200).send({ name, thumbnail })
	} catch (err) {
		res.status(400).send(err.message)
		return
	}
})

app.post("/verify_playlist", async (req, res) => {
	const { url } = req.body as { url: string }

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

app.post("/cache_zip", async (req, res) => {
	const { files, format } = req.body as {
		files: {
			url: string
			name: string
		}[]
		format: "videoandaudio" | "audioonly"
	}

	if (files.length < 1) {
		res.status(400).send("Cannot download 0 files")
		return
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

app.get("/download_cache", (req, res) => {
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
			(data.format === "audioonly" ? ".mp3" : ".mp4")

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
			return
		}
	}

	archive.finalize()
})

app.get("/download_file", (req, res) => {
	const { url, format, name } = req.query as {
		url: string
		format: "videoandaudio" | "audioonly"
		name: string
	}

	if (!url || !format || !name) {
		res.status(400).send("Missing items in URL")
	}

	try {
		res.setHeader(
			"Content-Disposition",
			`attachment; filename="${name}.${
				format === "audioonly" ? "mp3" : "mp4"
			}"`
		)
		ytdl(url, {
			filter: format,
			quality: "highest"
		}).pipe(res)
	} catch (e) {
		console.log("Caught error:", e.message)
		res.status(400).send(e.message)
	}
})

app.get("*", (_req, res) => res.redirect("/video"))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
