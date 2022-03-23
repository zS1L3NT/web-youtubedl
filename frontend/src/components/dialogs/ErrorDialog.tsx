import ErrorDialogContext from "../../contexts/ErrorDialogContext"
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from "@mui/material"
import { useContext } from "react"

const ErrorDialog = () => {
	const { isOpen, setIsOpen, text } = useContext(ErrorDialogContext)

	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)} aria-labelledby="alert-dialog-title">
			<DialogTitle id="alert-dialog-title">An Error Occured</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">{text}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setIsOpen(false)} autoFocus>
					Okay
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ErrorDialog
