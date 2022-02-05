import Head from "next/head"
import Navigator from "../components/Navigator"
import theme from "../theme"
import { AppProps } from "next/app"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { StrictMode } from "react"
import "../index.css"

const App = ({ Component, pageProps }: AppProps) => (
	<StrictMode>
		<Head>
			<title>YouTube DL</title>
			<link rel="icon" href="favicon.ico" />
			<link rel="apple-touch-icon" href="favicon.ico"></link>
			<link rel="manifest" href="manifest.json" />
			<meta name="theme-color" content="#000000" />
			<meta name="title" content="YouTube DL" />
			<meta name="description" content="Download Audio or Videos from YouTube" />
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://youtubedl.zectan.com/" />
			<meta property="og:title" content="YouTube DL" />
			<meta property="og:description" content="Download Audio or Videos from YouTube" />
			<meta property="og:image" content="https://youtubedl.zectan.com/favicon.png" />
		</Head>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="w-100 h-100">
				<Navigator />
				<Component {...pageProps} />
			</div>
		</ThemeProvider>
	</StrictMode>
)

export default App
