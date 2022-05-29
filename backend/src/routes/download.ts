import ffmpeg from "fluent-ffmpeg"
import { OBJECT, STRING } from "validate-any"
import ytdl from "ytdl-core"

import logger from "../logger"
import { Route } from "../setup"

export class GET extends Route<
	any,
	{
		url: string
		format: "videoandaudio" | "audioonly"
		name: string
		bitrate: string
	}
> {
	override queryValidator = OBJECT({
		url: STRING(),
		format: STRING("videoandaudio", "audioonly"),
		name: STRING(),
		bitrate: STRING()
	})

	override async handle() {
		const { url, format, name, bitrate } = this.query
		const stream = ytdl(url, {
			filter: format,
			quality: "highest"
		})

		this.res.setHeader(
			"Content-Disposition",
			`attachment; filename="${name}.${format === "audioonly" ? "mp3" : "mp4"}"`
		)

		if (format === "videoandaudio") {
			stream.pipe(this.res).on("error", err => {
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
				.pipe(this.res)
		}
	}
}
