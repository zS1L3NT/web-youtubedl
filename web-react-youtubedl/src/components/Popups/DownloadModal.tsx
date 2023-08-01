import axios from "axios"
import { Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react"

import { Alert, Button, Flex, Modal, Select, Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertCircle } from "@tabler/icons-react"

import ResultsContext from "../../contexts/VideosContext"

const DownloadModal = ({
	video,
	open,
	setOpen,
}: PropsWithChildren<{
	video: iVideo
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}>) => {
	const { setVideos } = useContext(ResultsContext)
	const [error, setError] = useState<string | null>(null)

	const form = useForm({
		initialValues: {
			filename: "",
			format: "audioonly" as "audioonly" | "videoandaudio",
			song: video.song,
		},
		validate: {
			filename: (value, { format }) =>
				format === "audioonly" || value ? null : "Filename cannot be empty",
		},
	})

	const onSubmit = form.onSubmit(values => {
		axios
			.post<string>(`/api/validate/filename`, {
				uuid: video.uuid,
				videoId: video.id,
				...values,
			})
			.then(({ data: url }) => {
				window.open(url)
				setOpen(false)
				setVideos(videos => videos.filter(v => v.uuid !== video.uuid))
			})
			.catch(err => setError(err.response?.data?.message || err.message))
	})

	return (
		<Modal
			opened={open}
			onClose={() => setOpen(false)}
			title={"Download MP" + (form.values.format === "audioonly" ? 3 : 4)}
			centered>
			<form onSubmit={onSubmit}>
				<Stack>
					<Select
						sx={{ mt: 1 }}
						label="Type"
						description="The type of file you want to download"
						dropdownPosition="bottom"
						data={[
							{ value: "audioonly", label: "Audio (MP3)" },
							{ value: "videoandaudio", label: "Video (MP4)" },
						]}
						{...form.getInputProps("format")}
					/>

					{form.values.format === "audioonly" && (
						<>
							<TextInput
								label="Title (optional)"
								description="The title of the song"
								{...form.getInputProps("song.title")}
							/>

							<TextInput
								label="Artist(s) (optional)"
								description="The artist(s) of the song"
								{...form.getInputProps("song.artists")}
							/>

							<TextInput
								label="Album (optional)"
								description="The album of the song"
								{...form.getInputProps("song.album")}
							/>
						</>
					)}

					{form.values.format === "videoandaudio" && (
						<TextInput
							autoFocus
							label="Filename"
							description="The filename of the video"
							rightSectionWidth={60}
							rightSection={<Text>.mp4</Text>}
							{...form.getInputProps("filename")}
						/>
					)}

					{error && (
						<Alert
							icon={<IconAlertCircle size="1rem" />}
							title="Error"
							color="red">
							{error}
						</Alert>
					)}

					<Flex gap="md">
						<Button
							type="submit"
							disabled={!video}>
							Download
						</Button>
						<Button
							variant="light"
							onClick={() => setOpen(false)}>
							Close
						</Button>
					</Flex>
				</Stack>
			</form>
		</Modal>
	)
}

export default DownloadModal
