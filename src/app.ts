import express from "express"
import cors from "cors"
import ytdl from "ytdl-core"
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

app.post("/verify_video", async (req, res) => {
	let { url, format, name } = req.body as {
		url: string
		format: "videoandaudio" | "audioonly"
		name: string
	}

	try {
		if (!name) {
			const info = await ytdl.getInfo(url)
			name = info.videoDetails.title
		}
	} catch (e) {
		res.status(400).send(
			"Error getting video title, please enter a proper YouTube URL"
		)
		return
	}

	const header = `attachment; filename="${name}.${
		format === "audioonly" ? "mp3" : "mp4"
	}"`
	try {
		res.header("Content-Disposition", header)
	} catch (e) {
		if (name) res.status(400).send("Filename contains invalid characters")
		else
			res.status(400).send(
				"Filename contains invalid characters, please type a filename"
			)
		return
	}

	try {
		ytdl(url, {
			filter: format,
			quality: "highest"
		}).pipe(res)
		res.end()
	} catch (err) {
		res.status(400).send(err.message)
		return
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
