import Head from "next/head"
import Navigator from "../components/Navigator"
import theme from "../theme"
import { AppProps } from "next/app"
import { CssBaseline, ThemeProvider } from "@mui/material"
import "../index.css"

const App = ({ Component, pageProps }: AppProps) => (
	<>
		<Head>
			<title>YouTube DL</title>
			<meta name="title" content="YouTube DL" />
			<meta name="description" content="Download Audio or Videos from YouTube" />
			<meta property="og:type" content="website" />
			<meta property="og:url" content="http://youtubedl.zectan.com/" />
			<meta property="og:title" content="YouTube DL" />
			<meta property="og:description" content="Download Audio or Videos from YouTube" />
			<meta property="og:image" content="http://youtubedl.zectan.com/favicon.png" />
		</Head>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="w-100 h-100">
				<Navigator />
				<Component {...pageProps} />
			</div>
		</ThemeProvider>
	</>
)

export default App
