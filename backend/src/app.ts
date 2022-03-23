import colors from "colors"
import dotenv from "dotenv"
import express from "express"
import ffmpeg from "fluent-ffmpeg"
import fs from "fs"
import path from "path"
import Tracer from "tracer"

dotenv.config()
ffmpeg.setFfmpegPath(require("@ffmpeg-installer/ffmpeg").path)

const PORT = 1902
const app = express()

global.logger = Tracer.colorConsole({
	level: process.env.LOG_LEVEL || "log",
	format: "[{{timestamp}}] <{{path}}, Line {{line}}> {{message}}",
	methods: ["log", "http", "debug", "info", "warn", "error"],
	dateformat: "dd mmm yyyy, hh:MM:sstt",
	filters: {
		log: colors.gray,
		//@ts-ignore
		http: colors.cyan,
		debug: colors.blue,
		info: colors.green,
		warn: colors.yellow,
		error: [colors.red, colors.bold]
	},
	preprocess: data => {
		data.path = data.path.split("\\src\\")[1]!.replaceAll("\\", "/")
	}
})

app.use(express.json())
app.use(express.static(path.join(__dirname, "../public")))

const readRouteFolder = (folderName: string) => {
	const folderPath = path.join(__dirname, "routes", folderName)

	for (const entityName of fs.readdirSync(folderPath)) {
		const [fileName, extensionName] = entityName.split(".")
		const pathName = `${folderName}/${fileName}`

		if (extensionName) {
			// Entity is a file
			const file = require(path.join(folderPath, entityName)) as Record<any, any>
			for (const [method, handler] of Object.entries(file)) {				
				app[method.toLowerCase() as "get" | "post" | "put" | "delete"](
					"/api" + pathName.replace(/\[(\w+)\]/g, ":$1"),
					handler
				)
			}
		} else {
			readRouteFolder(pathName)
		}
	}
}

readRouteFolder("")

app.listen(PORT, () => logger.log(`Server running on port ${PORT}`))
