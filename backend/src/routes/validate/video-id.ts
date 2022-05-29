import { useTryAsync } from "no-try"
import { OBJECT, STRING } from "validate-any"
import ytdl from "ytdl-core"
import ytpl from "ytpl"

import { Route } from "../../setup"

export class POST extends Route<{
	url: string
}> {
	override bodyValidator = OBJECT({
		url: STRING()
	})

	override async handle() {
		const [videoErr, videoInfo] = await useTryAsync(() => ytdl.getInfo(this.body.url))
		if (videoErr) {
			const [playlistErr, playlistInfo] = await useTryAsync(() => ytpl(this.body.url))
			if (playlistErr) {
				this.throw("Error getting video title, please enter a proper YouTube URL")
			} else {
				this.respond(
					playlistInfo.items.map(item => ({
						id: item.id,
						name: item.title,
						thumbnail: item.thumbnails.at(-1)?.url || ""
					}))
				)
			}
		} else {
			this.respond([
				{
					id: videoInfo.videoDetails.videoId,
					name: videoInfo.videoDetails.title,
					thumbnail: videoInfo.videoDetails.thumbnails.at(-1)?.url || ""
				}
			])
		}
	}
}
