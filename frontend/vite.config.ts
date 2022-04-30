import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			strategies: "injectManifest",
			srcDir: "src",
			filename: "service-worker.ts"
		})
	],
	server: {
		proxy: {
			"/api": "http://localhost:1902"
		}
	}
})
