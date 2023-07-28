import { useContext } from "react"

import { Dialog, Button, Text } from "@mantine/core"

import ErrorDialogContext from "../../contexts/ErrorDialogContext"

const ErrorDialog = () => {
	const { isOpen, setIsOpen, text } = useContext(ErrorDialogContext)

	return (
		<Dialog opened={isOpen} onClose={() => setIsOpen(false)}>
			<Text weight={700} size="lg">
				An Error Occurred
			</Text>
			<Text>{text}</Text>
			<Button ml="auto" mt="sm" onClick={() => setIsOpen(false)} autoFocus>
				Close
			</Button>
		</Dialog>
	)
}

export default ErrorDialog
