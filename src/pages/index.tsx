import axios from "axios"
import VideoGridItem from "../components/VideoGridItem"
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
import { NextPage } from "next"
import { useState } from "react"

const Index: NextPage = () => {
	//#region Hooks
	const [dialogOpen, setDialogOpen] = useState(false)
	const [dialogText, setDialogText] = useState("")
	const [videos, setVideos] = useState<iVideo[]>([])
	const [format, setFormat] = useState<"audioonly" | "videoandaudio">("audioonly")
	const [url, setUrl] = useState("")
	//#endregion

	//#region Functions
	const handleConvert = async () => {
		axios
			.post(`/api/validate/video-id`, { url })
			.then(res => {
				setVideos(videos => [
					...videos,
					{
						...res.data,
						format
					}
				])
			})
			.catch(err => {
				setDialogOpen(true)
				setDialogText(err.response?.data?.message || err.message)
			})
	}
	//#endregion

	return (
		<>
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

				<Grid sx={{ mt: 3 }} container justifyContent="space-evenly" spacing={2}>
					{videos.map((video, i) => (
						<VideoGridItem key={i} video={video} setVideos={setVideos} />
					))}
				</Grid>
			</Container>
			<Dialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				aria-labelledby="alert-dialog-title">
				<DialogTitle id="alert-dialog-title">An Error Occured</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{dialogText}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDialogOpen(false)} autoFocus>
						Okay
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default Index
