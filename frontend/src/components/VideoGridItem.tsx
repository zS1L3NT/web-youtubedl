import { PropsWithChildren, useState } from "react"

import { CardHeader } from "@mui/material"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Grid"

import DownloadDialog from "./Popups/DownloadDialog"

const _VideoGridItem = (
	props: PropsWithChildren<{
		video: iVideo
	}>
): JSX.Element => {
	const { video } = props

	const [dialogOpen, setDialogOpen] = useState(false)

	return (
		<>
			<Grid sx={{ width: { xs: 400, sm: 500 } }} item>
				<Card onClick={() => setDialogOpen(true)}>
					<CardActionArea>
						<CardHeader title={video.name} subheader={video.channel} />
						<CardMedia
							component="img"
							width="100%"
							image={video.thumbnail}
							alt="Thumbnail"
						/>
					</CardActionArea>
				</Card>
			</Grid>
			<DownloadDialog video={video} open={dialogOpen} setOpen={setDialogOpen} />
		</>
	)
}

export default _VideoGridItem
