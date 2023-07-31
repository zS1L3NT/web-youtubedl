import { useTryAsync } from "no-try"
import { v4 } from "uuid"
import ytdl from "ytdl-core"
import ytpl from "ytpl"
import { type } from "arktype"

import { Route } from "../../setup.js"
import ytmusic from "../../ytmusic.js"

export class POST extends Route<{ text: string }> {
	override bodyValidator = type({ text: "string" })

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
				await Promise.all(
					playlistInfo.items.map(async item => ({
						uuid: v4(),
						id: item.id,
						video: {
							name: item.title,
							channel: item.author.name,
							thumbnail: item.thumbnails.at(-1)?.url || "",
						},
						song: await this.getSongData(item.id)
					}))
				)
			)
			return
		}

		if (videoInfo) {
			this.respond([
				{
					uuid: v4(),
					id: videoInfo.videoDetails.videoId,
					video: {
						name: videoInfo.videoDetails.title,
						channel: videoInfo.videoDetails.author.name,
						thumbnail: videoInfo.videoDetails.thumbnails.at(-1)?.url || "",
					},
					song: await this.getSongData(videoInfo.videoDetails.videoId)
				}
			])
			return
		}
	}

	getSongData(videoId: string) {
		return ytmusic.getSong(videoId).then(song => ({
			title: song.name,
			artists: song.artists.map(artist => artist.name).join(", "),
			thumbnail: song.thumbnails.at(-1)?.url || ""
		}))
	}
}
