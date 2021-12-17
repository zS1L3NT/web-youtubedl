import ytdl from "ytdl-core"
import { NextApiRequest, NextApiResponse } from "next"
import { useTryAsync as _useTryAsync } from "no-try"

type Data = { message: string } | Omit<iVideo, "format">

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	if (req.method !== "POST") return

	const url = req.body.url

	const [err, info] = await _useTryAsync(() => ytdl.getInfo(url))
	if (err) {
		res.status(400).send({
			message: "Error getting video title, please enter a proper YouTube URL"
		})
		return
	}

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

export default handler
