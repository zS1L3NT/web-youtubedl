import App from "./App"
import ReactDOM from "react-dom"
import { StrictMode } from "react"
import "./index.css"

ReactDOM.hydrate(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById("root")
)
