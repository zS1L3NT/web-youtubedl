import express from "express"
import cors from "cors"
import ytdl from "ytdl-core"
import path from "path"

const app = express()
const PORT = 1902

app.use(cors())
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "../views"))

app.get("/video", (_req, res) => {
	res.render("index", { title: "Video", format: "videoandaudio" })
})

app.get("/audio", (_req, res) => {
	res.render("index", { title: "Audio", format: "audioonly" })
})

app.get("/download", async (req, res) => {
	console.log(req.query)
	let { URL, format, filename } = req.query as {
		URL: string
		format: "videoandaudio" | "audioonly"
		filename: string
	}

	if (!filename) {
		const info = await ytdl.getInfo(URL)
		filename = info.videoDetails.title
	}

	res.header(
		"Content-Disposition",
		`attachment; filename="${filename}.${
			format === "audioonly" ? "mp3" : "mp4"
		}"`
	)

	try {
		ytdl(URL, {
			filter: format,
			quality: "highest"
		}).pipe(res)
	} catch (err) {
		res.json(err)
	}
})

app.get("*", (_req, res) => res.redirect("/video"))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
