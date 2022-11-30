import "./index.css"

import axios from "axios"
import { StrictMode } from "react"
import { render } from "react-dom"

import { ThemeProvider } from "@mui/material"

import App from "./App"
import ContextProviders from "./contexts/ContextProviders"
import theme from "./theme"

if (import.meta.env.DEV) {
	axios.defaults.baseURL = "http://localhost:8080"
}

render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<ContextProviders>
				<App />
			</ContextProviders>
		</ThemeProvider>
	</StrictMode>,
	document.getElementById("root")
)
