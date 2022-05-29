import { useTryAsync } from "no-try"
import { v4 } from "uuid"
import { OBJECT, STRING } from "validate-any"
import ytdl from "ytdl-core"
import ytpl from "ytpl"

import { Route } from "../../setup"

export class POST extends Route<{ text: string }> {
	override bodyValidator = OBJECT({
		text: STRING()
	})

	override async handle() {
		const [[videoErr, videoInfo], [playlistErr, playlistInfo]] = await Promise.all([
			useTryAsync(() => ytdl.getInfo(this.body.text)),
			useTryAsync(() => ytpl(this.body.text))
		])

		if (videoErr && playlistErr) {
			this.throw("Error getting video/playlist title, please enter a proper YouTube URL")
		}

		if (playlistInfo) {
			this.respond(
				playlistInfo.items.map(item => ({
					uuid: v4(),
					id: item.id,
					name: item.title,
					channel: item.author.name,
					thumbnail: item.thumbnails.at(0)?.url || ""
				}))
			)
			return
		}

		if (videoInfo) {
			this.respond([
				{
					uuid: v4(),
					id: videoInfo.videoDetails.videoId,
					name: videoInfo.videoDetails.title,
					channel: videoInfo.videoDetails.author.name,
					thumbnail: videoInfo.videoDetails.thumbnails.at(0)?.url || ""
				}
			])
			return
		}
	}
}
