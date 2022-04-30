import { useContext, useState } from "react"

import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"

import Navigator from "./components/Navigator"
import ErrorDialog from "./components/Popups/ErrorDialog"
import PWASnackbar from "./components/Popups/PWASnackbar"
import VideoGridItem from "./components/VideoGridItem"
import ResultsContext from "./contexts/ResultsContext"

const _App = () => {
	const { setResults, results } = useContext(ResultsContext)
	const [format, setFormat] = useState<"audioonly" | "videoandaudio">("audioonly")
	const [url, setUrl] = useState("")

	const handleConvert = async () => {
		setResults(queries => [...queries, { url, format, time: Date.now() }])
		setUrl("")
	}

	return (
		<>
			<CssBaseline />
			<Navigator />
			<Container sx={{ my: 3 }}>
				<TextField
					sx={{ mt: 2 }}
					id="type-select"
					select
					label="Type"
					value={format}
					fullWidth
					onChange={e => setFormat(e.target.value as typeof format)}>
					<MenuItem value="audioonly">Audio (MP3)</MenuItem>
					<MenuItem value="videoandaudio">Video (MP4)</MenuItem>
				</TextField>
				<TextField
					sx={{ mt: 2 }}
					label="Link"
					variant="outlined"
					value={url}
					fullWidth
					onChange={e => setUrl(e.target.value)}
				/>

				<Stack>
					<Button sx={{ mt: 2, mx: "auto" }} variant="contained" onClick={handleConvert}>
						Convert
					</Button>
				</Stack>

				<Grid sx={{ mt: 3, pb: 3 }} container justifyContent="space-evenly" spacing={2}>
					{results.map((query, i) => (
						<VideoGridItem key={i} result={query} />
					))}
				</Grid>
			</Container>
			<ErrorDialog />
			<PWASnackbar />
		</>
	)
}

export default _App
