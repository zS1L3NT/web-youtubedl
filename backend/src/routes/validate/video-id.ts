import ytdl from "ytdl-core"
import { OBJECT, STRING, withValidBody } from "validate-any"
import { Request, Response } from "express"
import { useTryAsync } from "no-try"

export const POST = withValidBody(OBJECT({ url: STRING() }))<Request, Response>(
	async (req, res) => {
		const [err, info] = await useTryAsync(() => ytdl.getInfo(req.body.url))
		if (err) {
			res.status(400).send({
				message: "Error getting video title, please enter a proper YouTube URL"
			})
		} else {
			res.status(200).send({
				id: info.videoDetails.videoId,
				name: info.videoDetails.title,
				thumbnail: info.videoDetails.thumbnails.at(-1)?.url || "",
				bitrate:
					info.formats
						.map(f => f.audioBitrate)
						.filter(f => !!f)
						.sort((a, b) => b! - a!)[0] || 160
			})
		}
	}
)