import { type } from "arktype"

import { Route } from "../../setup.js"

const bodyType = type({
	uuid: "string",
	videoId: "string",
	filename: "string",
	format: '"audioonly"|"videoandaudio"',
	song: {
		title: "string",
		artists: "string",
		album: "string",
		thumbnail: "string",
	},
})

export class POST extends Route<typeof bodyType.infer> {
	override bodyValidator = bodyType

	override async handle() {
		const filename =
			this.body.format === "audioonly"
				? `${this.body.song.title} - ${this.body.song.artists}`
				: this.body.filename
		if (filename === "") {
			this.throw("Filename cannot be empty")
		} else {
			try {
				this.res.setHeader("Content-Disposition", `attachment; filename="${filename}.mp3"`)
			} catch (e) {
				this.throw("Filename contains invalid characters")
			}

			const url = new URL("http://www.example.com")
			url.host = "localhost"
			url.pathname = "/api/download"
			url.searchParams.set("uuid", this.body.uuid)
			url.searchParams.set("videoId", this.body.videoId)
			url.searchParams.set("format", this.body.format)
			url.searchParams.set("filename", filename)
			if (this.body.format === "audioonly") {
				url.searchParams.set("song.title", this.body.song.title)
				url.searchParams.set("song.artists", this.body.song.artists)
				url.searchParams.set("song.album", this.body.song.album)
				url.searchParams.set("song.thumbnail", this.body.song.thumbnail)
			}
			this.res.status(200).send(url.pathname + url.search)
		}
	}
}
