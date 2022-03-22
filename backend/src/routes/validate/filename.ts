import { Request, Response } from "express"

export const POST = async (req: Request, res: Response) => {
	const filename = req.body.filename as string

	if (filename === "") {
		res.status(400).send({
			message: "Filename cannot be empty"
		})
	} else {
		try {
			res.setHeader("Content-Disposition", `attachment; filename="${filename}.mp3"`)
			res.status(200).end()
		} catch (e) {
			res.status(400).send({ message: "Filename contains invalid characters" })
		}
	}
}
