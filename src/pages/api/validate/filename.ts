import { NextApiRequest, NextApiResponse } from "next"

type Data = {
	message: string
}

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
	if (req.method !== "POST") return

	const filename = req.body.filename as string

	try {
		res.setHeader("Content-Disposition", `attachment; filename="${filename}.mp3"`)
		res.status(200).end()
	} catch (e) {
		res.status(400).send({ message: "Filename contains invalid characters" })
	}
}

export default handler
