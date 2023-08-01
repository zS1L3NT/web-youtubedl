import axios from "axios"
import { useContext, useState } from "react"

import { Button, Container, Grid, Stack, TextInput } from "@mantine/core"

import ErrorDialog from "./components/Popups/ErrorDialog"
import VideoGridItem from "./components/VideoGridItem"
import ErrorDialogContext from "./contexts/ErrorDialogContext"
import ResultsContext from "./contexts/VideosContext"

const App = () => {
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
				console.error(err)
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
		<Container>
			<Stack
				my="md"
				px="md">
				<TextInput
					label="YouTube Link"
					placeholder="Link to a youtube video or playlist"
					value={text}
					disabled={loading}
					onChange={e => setText(e.target.value)}
				/>

				<Button
					w="fit-content"
					mx="auto"
					onClick={handleConvert}
					disabled={loading || text === ""}>
					Convert
				</Button>

				<Grid>
					{videos.map(video => (
						<VideoGridItem
							key={video.uuid}
							video={video}
						/>
					))}
				</Grid>
			</Stack>
			<ErrorDialog />
		</Container>
	)
}

export default App
