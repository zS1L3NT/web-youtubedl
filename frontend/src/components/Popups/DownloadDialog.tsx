import axios from "axios"
import { Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react"

import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import InputAdornment from "@mui/material/InputAdornment"
import MenuItem from "@mui/material/MenuItem"
import Skeleton from "@mui/material/Skeleton"
import TextField from "@mui/material/TextField"

import ResultsContext from "../../contexts/VideosContext"

const _DownloadDialog = (
	props: PropsWithChildren<{
		video: iVideo
		open: boolean
		setOpen: Dispatch<SetStateAction<boolean>>
	}>
) => {
	const { video, open, setOpen } = props

	const { setVideos } = useContext(ResultsContext)
	const [errorText, setErrorText] = useState<string | null>(null)
	const [filename, setFilename] = useState<string>("")
	const [format, setFormat] = useState<"audioonly" | "videoandaudio">("audioonly")

	const handleRemove = () => {
		setVideos(videos => videos.filter(v => v.uuid !== video.uuid))
		setOpen(false)
	}

	const handleDownload = () => {
		if (video) {
			axios
				.post(`/api/validate/filename`, { filename })
				.then(() => {
					const url = new URL(`${window.location.origin}/api/download`)
					url.searchParams.set("url", `https://youtu.be/${video.id}`)
					url.searchParams.set("format", format)
					url.searchParams.set("name", filename)
					window.open(url.href)
					setOpen(false)
				})
				.catch(err => setErrorText(err.response?.data?.message || err.message))
		}
	}

	const handleFilenameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setFilename(e.target.value)
		setErrorText(null)
	}

	const handleDialogClose = () => {
		setOpen(false)
		setErrorText(null)
	}

	return (
		<Dialog open={open} onClose={handleDialogClose}>
			<DialogTitle>
				{video ? (
					"Download MP" + (format === "audioonly" ? 3 : 4)
				) : (
					<Skeleton variant="text" />
				)}
			</DialogTitle>
			<DialogContent>
				<TextField
					sx={{ mt: 1 }}
					id="type-select"
					select
					label="Type"
					value={format}
					fullWidth
					onChange={e => setFormat(e.target.value as typeof format)}>
					<MenuItem value="audioonly">Audio (MP3)</MenuItem>
					<MenuItem value="videoandaudio">Video (MP4)</MenuItem>
				</TextField>
				<DialogContentText sx={{ mt: 2 }}>
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
									format === "audioonly" ? (
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
	)
}

export default _DownloadDialog
