import { type } from "arktype"
import ffmpeg from "fluent-ffmpeg"
import fs from "fs"
import https from "https"
import NodeID3, { TagConstants } from "node-id3"
import path from "path"
import ytdl from "ytdl-core"

import logger from "../logger.js"
import { Route } from "../setup.js"

const queryType = type({
	uuid: "string",
	videoId: "string",
	format: '"videoandaudio" | "audioonly"',
	filename: "string",
	"song.title?": "string",
	"song.artists?": "string",
	"song.album?": "string",
	"song.thumbnail?": "string",
})

export class GET extends Route<never, typeof queryType.infer> {
	override queryValidator = queryType

	override async handle() {
		const { uuid, videoId, format, filename } = this.query

		const bitrate =
			(await ytdl.getBasicInfo(videoId)).formats
				.map(f => f.audioBitrate)
				.filter(f => !!f)
				.sort((a, b) => b! - a!)[0] || 160

		const stream = ytdl(videoId, {
			filter: format,
			quality: "highest",
		})

		this.res.setHeader(
			"Content-Disposition",
			`attachment; filename="${filename}.${format === "audioonly" ? "mp3" : "mp4"}"`,
		)

		if (format === "videoandaudio") {
			stream.pipe(this.res).on("error", err => {
				logger.error("Error piping video:", err.message)
			})
			return
		}

		// Check if temp directory exists first
		if (fs.existsSync(path.join(import.meta.url.slice(5), "../../../temp")) === false) {
			fs.mkdirSync(path.join(import.meta.url.slice(5), "../../../temp"))
		}

		const file = fs.createWriteStream(
			path.join(import.meta.url.slice(5), "../../../temp", uuid + ".mp3"),
		)

		ffmpeg(stream)
			.audioBitrate(bitrate)
			.withAudioCodec("libmp3lame")
			.toFormat("mp3")
			.pipe(file)
			.on("finish", () => this.writeID3(file.path as string))
			.on("error", err => {
				if (err.message !== "Output stream closed") {
					logger.error("Error writing audio:", err.message)
				}
				fs.unlinkSync(file.path)
			})
	}

	writeID3(path: string) {
		this.getThumbnailBuffer()
			.then(image => {
				NodeID3.Promise.write(
					{
						title: this.query["song.title"],
						artist: this.query["song.artists"],
						album: this.query["song.album"],
						image: {
							mime: "image/jpeg",
							type: { id: TagConstants.AttachedPicture.PictureType.FRONT_COVER },
							description: `${this.query["song.title"]} - ${this.query["song.artists"]}`,
							imageBuffer: image,
						},
					},
					fs.readFileSync(path),
				)
					.then(buffer => {
						this.res.contentType("audio/mpeg")
						this.res.send(buffer)
					})
					.catch(e => logger.error("Error writing ID3 to audio:", e.message))
			})
			.catch(e => logger.error("Error getting thumbnail buffer:", e.message))
			.finally(() => fs.unlinkSync(path))
	}

	async getThumbnailBuffer(): Promise<Buffer> {
		return new Promise<Buffer>((resolve, reject) => {
			const chunks: Uint8Array[] = []
			https.get(this.query["song.thumbnail"] ?? "", res => {
				res.on("data", chunks.push.bind(chunks))
					.on("end", () => resolve(Buffer.concat(chunks)))
					.on("error", reject)
			})
		})
	}
}
