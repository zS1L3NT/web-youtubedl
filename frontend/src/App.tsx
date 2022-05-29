import axios from "axios"
import { useContext, useState } from "react"

import { CircularProgress } from "@mui/material"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"

import Navigator from "./components/Navigator"
import ErrorDialog from "./components/Popups/ErrorDialog"
import PWASnackbar from "./components/Popups/PWASnackbar"
import VideoGridItem from "./components/VideoGridItem"
import ErrorDialogContext from "./contexts/ErrorDialogContext"
import ResultsContext from "./contexts/VideosContext"

const _App = () => {
	const { setIsOpen, setMessage } = useContext(ErrorDialogContext)
	const { setVideos, videos } = useContext(ResultsContext)
	const [loading, setLoading] = useState(false)
	const [text, setText] = useState("")

	const handleConvert = async () => {
		axios
			.post(`/api/validate/input`, { text })
			.then(res => {
				setVideos(videos => [...videos, ...res.data])
			})
			.catch(err => {
				setIsOpen(true)
				setMessage(err.response.data.message)
			})
			.finally(() => {
				setLoading(false)
				setText("")
			})

		setLoading(true)
	}

	return (
		<>
			<CssBaseline />
			<Navigator />
			<Container sx={{ my: 3 }}>
				<TextField
					sx={{ mt: 2 }}
					label="Link"
					variant="outlined"
					value={text}
					fullWidth
					disabled={loading}
					onChange={e => setText(e.target.value)}
					InputProps={{
						endAdornment: loading ? <CircularProgress size={24} /> : null
					}}
				/>

				<Stack>
					<Button
						sx={{ my: 2, mx: "auto" }}
						variant="contained"
						onClick={handleConvert}
						disabled={loading || text === ""}>
						Convert
					</Button>
				</Stack>

				<Grid sx={{ mt: 3, pb: 3 }} container justifyContent="space-evenly" spacing={2}>
					{videos.map(video => (
						<VideoGridItem key={video.uuid} video={video} />
					))}
				</Grid>
			</Container>
			<ErrorDialog />
			<PWASnackbar />
		</>
	)
}

export default _App
