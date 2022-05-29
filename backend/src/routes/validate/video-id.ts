import { useTryAsync } from "no-try"
import { OBJECT, STRING } from "validate-any"
import ytdl from "ytdl-core"

import { Route } from "../../setup"

export class POST extends Route<{
	url: string
}> {
	override bodyValidator = OBJECT({
		url: STRING()
	})

	override async handle() {
		const [err, info] = await useTryAsync(() => ytdl.getInfo(this.body.url))
		if (err) {
			this.throw("Error getting video title, please enter a proper YouTube URL")
		} else {
			this.res.status(200).send({
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
}
