import express from "express"
import cors from "cors"
import ytdl from "ytdl-core"
import ytpl from "ytpl"
import path from "path"

const app = express()
const PORT = 1902

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

app.get("/download", (req, res) => {
	const { url, format, name } = req.query as {
		url: string
		format: "videoandaudio" | "audioonly"
		name: string
	}

	if (!url || !format || !name) {
		res.redirect("/video")
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
		res.redirect("/video")
	}
})

app.get("*", (_req, res) => res.redirect("/video"))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
