import ffmpeg from "fluent-ffmpeg"
import ytdl from "ytdl-core"
import { OBJECT, STRING, withValidQuery } from "validate-any"
import { Request, Response } from "express"

export const GET = withValidQuery(
	OBJECT({
		url: STRING(),
		format: STRING("videoandaudio", "audioonly"),
		name: STRING(),
		bitrate: STRING()
	})
)<Request, Response>((req, res) => {
	const { url, format, name, bitrate } = req.query
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
			logger.error("Video: ", err.message)
		})
	} else {
		ffmpeg(stream)
			.audioBitrate(bitrate)
			.withAudioCodec("libmp3lame")
			.toFormat("mp3")
			.on("error", err => {
				if (err.message !== "Output stream closed") {
					logger.error("Audio: ", err.message)
				}
			})
			.pipe(res)
	}
})
