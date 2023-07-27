import { Route } from "../../setup"
import { type } from "arktype"

export class POST extends Route<{ filename: string }> {
	override bodyValidator = type({ filename: "string" })

	override async handle() {
		if (this.body.filename === "") {
			this.throw("Filename cannot be empty")
		} else {
			try {
				this.res.setHeader(
					"Content-Disposition",
					`attachment; filename="${this.body.filename}.mp3"`
				)
				this.res.status(200).end()
			} catch (e) {
				this.throw("Filename contains invalid characters")
			}
		}
	}
}
