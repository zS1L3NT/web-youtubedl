import ErrorDialogContext from "./contexts/ErrorDialogContext"
import Navigator from "./components/Navigator"
import theme from "./theme"
import VideoGridItem from "./components/VideoGridItem"
import {
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	MenuItem,
	Stack,
	TextField
} from "@mui/material"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { useState } from "react"

const App = (): JSX.Element => {
	const [dialogIsOpen, setDialogIsOpen] = useState(false)
	const [dialogText, setDialogText] = useState("")
	const [searches, setSearches] = useState<iSearch[]>([])
	const [format, setFormat] = useState<"audioonly" | "videoandaudio">("audioonly")
	const [url, setUrl] = useState("")

	const handleConvert = async () => {
		setSearches(queries => [...queries, { url, format, time: Date.now() }])
		setUrl("")
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="w-100 h-100">
				<Navigator />
				<ErrorDialogContext.Provider
					value={{
						isOpen: dialogIsOpen,
						text: dialogText,
						setIsOpen: setDialogIsOpen,
						setText: setDialogText
					}}>
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
							<Button
								sx={{ mt: 2, mx: "auto" }}
								variant="contained"
								onClick={handleConvert}>
								Convert
							</Button>
						</Stack>

						<Grid sx={{ mt: 3 }} container justifyContent="space-evenly" spacing={2}>
							{searches.map((query, i) => (
								<VideoGridItem key={i} search={query} setSearches={setSearches} />
							))}
						</Grid>
					</Container>
					<Dialog
						open={dialogIsOpen}
						onClose={() => setDialogIsOpen(false)}
						aria-labelledby="alert-dialog-title">
						<DialogTitle id="alert-dialog-title">An Error Occured</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								{dialogText}
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setDialogIsOpen(false)} autoFocus>
								Okay
							</Button>
						</DialogActions>
					</Dialog>
				</ErrorDialogContext.Provider>
			</div>
		</ThemeProvider>
	)
}

export default App
