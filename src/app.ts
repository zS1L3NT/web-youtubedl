import express from "express"
import ffmpeg from "fluent-ffmpeg"
import next from "next"
import ytdl from "ytdl-core"
import { OBJECT, STRING, validate } from "validate-any"

const PORT = 1902
const dev = process.env.NODE_ENV !== "production"

const app = next({ dev })
const handle = app.getRequestHandler()
ffmpeg.setFfmpegPath(require("@ffmpeg-installer/ffmpeg").path)

app.prepare().then(() => {
	const app = express()

	app.get("/api/download", (req, res) => {
		const { success, errors, data } = validate(
			req.query,
			OBJECT({
				url: STRING(),
				format: STRING("videoandaudio", "audioonly"),
				name: STRING(),
				bitrate: STRING()
			}),
			"URL"
		)

		if (!success) {
			res.status(400).send(
				"The Following errors exist in the URL:" + errors.map(e => "\n - " + e).join("")
			)
			return
		}

		const { url, format, name, bitrate } = data!
		const stream = ytdl(url, {
			filter: format,
			quality: "highest"
		})

		res.setHeader(
			"Content-Disposition",
			`attachment; filename="${name}.${format === "audioonly" ? "mp3" : "mp4"}"`
		)

		if (format === "videoandaudio") {
			stream.pipe(res).on("error", err => {
				console.error("Video: ", err.message)
			})
		} else {
			ffmpeg(stream)
				.audioBitrate(bitrate)
				.withAudioCodec("libmp3lame")
				.toFormat("mp3")
				.on("error", err => {
					if (err.message !== "Output stream closed") {
						console.error("Audio: ", err.message)
					}
				})
				.pipe(res)
		}
	})

	app.all("*", (req, res) => handle(req, res))

	app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
