import ffmpeg from "fluent-ffmpeg"
import ytdl from "ytdl-core"
import { NextApiRequest, NextApiResponse } from "next"
import { OBJECT, STRING, validate } from "validate-any"

ffmpeg.setFfmpegPath(require("@ffmpeg-installer/ffmpeg").path)

type Data = {}

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
	if (req.method !== "GET") return

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
			console.error(err.message)
		})
	} else {
		ffmpeg(stream)
			.audioBitrate(bitrate)
			.withAudioCodec("libmp3lame")
			.toFormat("mp3")
			.pipe(res)
			.on("error", err => {
				console.error(err.message)
			})
	}
}

export default handler
