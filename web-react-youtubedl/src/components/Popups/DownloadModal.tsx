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
			format: "audioonly",
		},
		validate: {
			filename: value => (value ? null : "Filename cannot be empty"),
		},
	})

	const onSubmit = form.onSubmit(({ filename, format }) => {
		axios
			.post(`/api/validate/filename`, { filename })
			.then(() => {
				const url = new URL(
					`${
						import.meta.env.DEV ? "http://localhost:8080" : window.location.origin
					}/api/download`,
				)
				url.searchParams.set("url", `https://youtu.be/${video.id}`)
				url.searchParams.set("format", format)
				url.searchParams.set("name", filename)
				window.open(url.href)
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
						data={[
							{ value: "audioonly", label: "Audio (MP3)" },
							{ value: "videoandaudio", label: "Video (MP4)" },
						]}
						{...form.getInputProps("format")}
					/>

					<TextInput
						autoFocus
						label="Filename"
						rightSectionWidth={60}
						rightSection={
							<Text>{form.values.format === "audioonly" ? ".mp3" : ".mp4"}</Text>
						}
						{...form.getInputProps("filename")}
					/>

					{error && (
						<Alert
							icon={<IconAlertCircle size="1rem" />}
							title="Bummer!"
							color="red">
							Something terrible happened! You made a mistake and there is no going
							back, your data was lost forever!
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
