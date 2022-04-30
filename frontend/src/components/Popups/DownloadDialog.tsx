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
import Skeleton from "@mui/material/Skeleton"
import TextField from "@mui/material/TextField"

import ResultsContext from "../../contexts/ResultsContext"

const _DownloadDialog = (
	props: PropsWithChildren<{
		time: number
		video: iVideo | null
		open: boolean
		setOpen: Dispatch<SetStateAction<boolean>>
	}>
) => {
	const { time, video, open, setOpen } = props

	const { setResults } = useContext(ResultsContext)
	const [errorText, setErrorText] = useState<string | null>(null)
	const [filename, setFilename] = useState<string>("")

	const handleRemove = () => {
		setResults(results => results.filter(s => s.time !== time))
		setOpen(false)
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
	)
}

export default _DownloadDialog
