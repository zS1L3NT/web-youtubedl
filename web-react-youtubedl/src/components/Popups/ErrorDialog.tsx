import { useContext } from "react"

import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

import ErrorDialogContext from "../../contexts/ErrorDialogContext"

const _ErrorDialog = () => {
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

export default _ErrorDialog
