import { useState } from "react"

import { Card, Grid, Image, Text } from "@mantine/core"

import DownloadModal from "./Popups/DownloadModal"

const VideoGridItem = ({ video }: { video: iVideo }): JSX.Element => {
	const [dialogOpen, setDialogOpen] = useState(false)

	return (
		<>
			<Grid.Col
				span={12}
				sm={6}
				lg={4}>
				<Card
					onClick={() => setDialogOpen(true)}
					sx={{ cursor: "pointer" }}
					shadow="sm"
					withBorder>
					<Card.Section>
						<Image
							sx={{ aspectRatio: "16/9" }}
							width="100%"
							src={video.video.thumbnail}
							alt="Thumbnail"
						/>
					</Card.Section>
					<Text
						weight={700}
						size="lg"
						mt="sm">
						{video.video.name}
					</Text>
					<Text color="dimmed">{video.video.channel}</Text>
				</Card>
			</Grid.Col>
			<DownloadModal
				video={video}
				open={dialogOpen}
				setOpen={setDialogOpen}
			/>
		</>
	)
}

export default VideoGridItem
