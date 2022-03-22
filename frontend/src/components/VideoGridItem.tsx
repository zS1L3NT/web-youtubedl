import axios from "axios"
import ErrorDialogContext from "../contexts/ErrorDialogContext"
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
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
	Skeleton,
	TextField
} from "@mui/material"

interface Props {
	search: iSearch
	setSearches: Dispatch<SetStateAction<iSearch[]>>
}

const VideoGridItem = (props: Props): JSX.Element => {
	const { search, setSearches } = props

	const { setIsOpen, setText } = useContext(ErrorDialogContext)
	const [dialogOpen, setDialogOpen] = useState(false)
	const [errorText, setErrorText] = useState<string | null>(null)
	const [filename, setFilename] = useState<string>("")
	const [video, setVideo] = useState<iVideo | null>(null)
	const [controller] = useState(new AbortController())

	useEffect(() => {
		axios
			.post(`/api/validate/video-id`, { url: search.url }, { signal: controller.signal })
			.then(res => {
				setVideo({
					...res.data,
					format: search.format
				})
			})
			.catch(err => {
				if (!controller.signal.aborted) {
					setIsOpen(true)
					setText(err.response?.data?.message || err.message)
				}
			})
		return () => {
			controller.abort()
		}
	}, [])

	const handleRemove = () => {
		setSearches(searches => searches.filter(s => s.time !== search.time))
		setDialogOpen(false)
	}

	const handleDownload = () => {
		if (video) {
			axios
				.post(`/api/validate/filename`, { filename })
				.then(() => {
					const url = new URL(`${window.location.origin}/api/download`)
					url.searchParams.set("url", `https://youtu.be/${video.id}`)
					url.searchParams.set("format", video.format)
					url.searchParams.set("name", filename)
					url.searchParams.set("bitrate", `${video.bitrate}`)
					window.location.href = url.href
				})
				.catch(err => setErrorText(err.response?.data?.message || err.message))
		}
	}

	const handleFilenameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setFilename(e.target.value)
		setErrorText(null)
	}

	const handleDialogClose = () => {
		setDialogOpen(false)
		setErrorText(null)
	}

	return (
		<>
			<Grid sx={{ width: { xs: 400, sm: 500 } }} item>
				<Card onClick={() => setDialogOpen(true)}>
					<CardActionArea>
						<CardHeader
							title={video ? video.name : <Skeleton variant="text" />}
							subheader={
								video ? (
									"Type: " +
									video.format[0]!.toUpperCase() +
									video.format.slice(1, 5)
								) : (
									<Skeleton variant="text" />
								)
							}
						/>
						{video ? (
							<CardMedia
								component="img"
								width="100%"
								image={video.thumbnail}
								alt="Thumbnail"
							/>
						) : (
							<Skeleton variant="rectangular" width="100%" height={250} />
						)}
					</CardActionArea>
				</Card>
			</Grid>
			<Dialog open={dialogOpen} onClose={handleDialogClose}>
				<DialogTitle>
					{video ? (
						"Download MP" + (video.format === "audioonly" ? 3 : 4)
					) : (
						<Skeleton variant="text" />
					)}
				</DialogTitle>
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
									{video ? (
										video.format === "audioonly" ? (
											".mp3"
										) : (
											".mp4"
										)
									) : (
										<Skeleton variant="text" width={36} height={36} />
									)}
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
					<Button onClick={handleDownload} disabled={!video}>
						Download
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default VideoGridItem
