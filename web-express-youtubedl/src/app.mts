import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import ffmpeg from "fluent-ffmpeg"
import fs from "fs"
import path from "path"
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg"

import { iRoute } from "./setup.js"

dotenv.config()
ffmpeg.setFfmpegPath(ffmpegInstaller.path)

const PORT = process.env.PORT || 8080
const app = express()

if (process.env.NODE_ENV !== "production") {
	app.use(cors())
}

app.use(express.json())
app.use(express.static(path.join(import.meta.url.slice(5), "../../../web-react-youtubedl/dist")))

const readRouteFolder = async (folderName: string) => {
	const folderPath = path.join(import.meta.url.slice(5), "../routes", folderName)

	for (const entityName of fs.readdirSync(folderPath)) {
		const [fileName, extensionName] = entityName.split(".")
		const pathName = `${folderName}/${fileName}`

		if (extensionName) {
			// Entity is a file
			const file = (await import(path.join(folderPath, entityName))) as Record<string, iRoute>
			for (const [method, Route] of Object.entries(file)) {
				app[method.toLowerCase() as "get" | "post" | "put" | "delete"](
					"/api" + pathName.replace(/\[(\w+)\]/g, ":$1"),
					(req, res) => new Route(req, res).setup()
				)
			}
		} else {
			readRouteFolder(pathName)
		}
	}
}

readRouteFolder("")

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
