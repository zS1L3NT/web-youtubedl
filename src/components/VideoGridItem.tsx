import axios from "axios"
import React, { Dispatch, SetStateAction, useState } from "react"
import {
	Alert,
	Button,
	Card,
	CardActionArea,
	CardHeader,
	CardMedia,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	InputAdornment,
	TextField
} from "@mui/material"
import { useRouter } from "next/router"

interface Props {
	video: iVideo
	setVideos: Dispatch<SetStateAction<iVideo[]>>
}

const VideoGridItem = (props: Props): JSX.Element => {
	const {
		video: { id, name, format, thumbnail, bitrate },
		setVideos
	} = props

	//#region Hooks
	const router = useRouter()
	const [dialogOpen, setDialogOpen] = useState(false)
	const [errorText, setErrorText] = useState<string | null>(null)
	const [filename, setFilename] = useState(name)
	//#endregion

	//#region Functions
	const handleRemove = () => {
		setVideos(videos => [...videos].filter((_, i) => videos.findIndex(v => v.id === id) !== i))
		setDialogOpen(false)
	}

	const handleDownload = () => {
		axios
			.post(`/api/validate/filename`, { filename })
			.then(() => {
				const url = new URL(`${window.location.origin}/api/download`)
				url.searchParams.set("url", `https://youtu.be/${id}`)
				url.searchParams.set("format", format)
				url.searchParams.set("name", filename)
				url.searchParams.set("bitrate", `${bitrate}`)
				router.push(url)
			})
			.catch(err => setErrorText(err.response?.data?.message || err.message))
	}

	const handleFilenameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setFilename(e.target.value)
		setErrorText(null)
	}

	const handleDialogClose = () => {
		setDialogOpen(false)
		setErrorText(null)
	}
	//#endregion

	return (
		<>
			<Grid sx={{ width: { xs: 400, sm: 500 } }} item>
				<Card onClick={() => setDialogOpen(true)}>
					<CardActionArea>
						<CardHeader
							title={name}
							subheader={"Type: " + format[0].toUpperCase() + format.slice(1, 5)}
						/>
						<CardMedia component="img" width="100%" image={thumbnail} alt="Thumbnail" />
					</CardActionArea>
				</Card>
			</Grid>
			<Dialog open={dialogOpen} onClose={handleDialogClose}>
				<DialogTitle>Download MP3</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Make sure the filename you type in here has no invalid characters
					</DialogContentText>
					<TextField
						autoFocus
						margin="normal"
						label="Filename"
						fullWidth
						variant="standard"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									.mp{format === "audioonly" ? 3 : 4}
								</InputAdornment>
							)
						}}
						value={filename}
						onChange={handleFilenameChange}
					/>
					{errorText && <Alert severity="error">{errorText}</Alert>}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleRemove}>Remove</Button>
					<Button onClick={handleDownload}>Download</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default VideoGridItem
