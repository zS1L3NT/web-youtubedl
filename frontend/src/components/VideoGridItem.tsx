import axios from "axios"
import DownloadDialog from "./Popups/DownloadDialog"
import ErrorDialogContext from "../contexts/ErrorDialogContext"
import ResultsContext from "../contexts/ResultsContext"
import { Card, CardActionArea, CardHeader, CardMedia, Grid, Skeleton } from "@mui/material"
import { useContext, useEffect, useState } from "react"

interface Props {
	result: iResult
}

const VideoGridItem = (props: Props): JSX.Element => {
	const { result } = props

	const { setIsOpen, setText } = useContext(ErrorDialogContext)
	const { setResults } = useContext(ResultsContext)
	const [dialogOpen, setDialogOpen] = useState(false)
	const [video, setVideo] = useState<iVideo | null>(null)
	const [controller] = useState(new AbortController())

	useEffect(() => {
		axios
			.post(`/api/validate/video-id`, { url: result.url }, { signal: controller.signal })
			.then(res => {
				setVideo({
					...res.data,
					format: result.format
				})
			})
			.catch(err => {
				if (!controller.signal.aborted) {
					setIsOpen(true)
					setText(err.response?.data?.message || err.message)
					setResults(results => results.filter(s => s.time !== result.time))
				}
			})
		return () => {
			controller.abort()
		}
	}, [])

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
			<DownloadDialog
				time={result.time}
				video={video}
				open={dialogOpen}
				setOpen={setDialogOpen}
			/>
		</>
	)
}

export default VideoGridItem
