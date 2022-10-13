import "./index.css"

import axios from "axios"
import { StrictMode } from "react"
import ReactDOM from "react-dom"

import { ThemeProvider } from "@mui/material"

import App from "./App"
import ContextProviders from "./contexts/ContextProviders"
import theme from "./theme"

// axios.defaults.baseURL = "localhost:8080"

ReactDOM.hydrate(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<ContextProviders>
				<App />
			</ContextProviders>
		</ThemeProvider>
	</StrictMode>,
	document.getElementById("root")
)
