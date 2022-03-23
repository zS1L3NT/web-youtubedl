import { OBJECT, STRING, withValidBody } from "validate-any"
import { Request, Response } from "express"

export const POST = withValidBody(OBJECT({ filename: STRING() }))<Request, Response>(
	async (req, res) => {
		if (req.body.filename === "") {
			res.status(400).send({
				message: "Filename cannot be empty"
			})
		} else {
			try {
				res.setHeader(
					"Content-Disposition",
					`attachment; filename="${req.body.filename}.mp3"`
				)
				res.status(200).end()
			} catch (e) {
				res.status(400).send({ message: "Filename contains invalid characters" })
			}
		}
	}
)
