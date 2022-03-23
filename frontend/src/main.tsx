import App from "./App"
import ContextProviders from "./contexts/ContextProviders"
import ReactDOM from "react-dom"
import theme from "./theme"
import { StrictMode } from "react"
import { ThemeProvider } from "@mui/material"
import "./index.css"

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
