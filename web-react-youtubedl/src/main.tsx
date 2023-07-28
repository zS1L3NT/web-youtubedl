import "./index.css"

import axios from "axios"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { ThemeProvider } from "@mui/material"

import App from "./App"
import ContextProviders from "./contexts/ContextProviders"
import theme from "./theme"

if (import.meta.env.DEV) {
	axios.defaults.baseURL = "http://localhost:8080"
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<ContextProviders>
				<App />
			</ContextProviders>
		</ThemeProvider>
	</StrictMode>
)
