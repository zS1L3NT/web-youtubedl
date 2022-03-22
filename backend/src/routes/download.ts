import ffmpeg from "fluent-ffmpeg"
import ytdl from "ytdl-core"
import { OBJECT, STRING, validate } from "validate-any"
import { Request, Response } from "express"

export const GET = (req: Request, res: Response) => {
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
			"The Following errors exist in the URL:" + errors.map(e => "<br>\n" + JSON.stringify(e)).join("")
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
}
