import ffmpeg from "fluent-ffmpeg"
import ytdl from "ytdl-core"
import { type } from "arktype"

import logger from "../logger"
import { Route } from "../setup"

export class GET extends Route<
	any,
	{
		url: string
		format: "videoandaudio" | "audioonly"
		name: string
	}
> {
	override queryValidator = type({
		url: "string",
		format: '"videoandaudio" | "audioonly"',
		name: "string"
	})

	override async handle() {
		const { url, format, name } = this.query

		const bitrate =
			(await ytdl.getBasicInfo(url)).formats
				.map(f => f.audioBitrate)
				.filter(f => !!f)
				.sort((a, b) => b! - a!)[0] || 160

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
