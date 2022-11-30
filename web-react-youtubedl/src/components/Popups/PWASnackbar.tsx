import { useRegisterSW } from "virtual:pwa-register/react"

import Close from "@mui/icons-material/Close"
import Button from "@mui/material/Button"
import Fade from "@mui/material/Fade"
import IconButton from "@mui/material/IconButton"
import Snackbar from "@mui/material/Snackbar"

const _PWASnackbar = () => {
	const {
		offlineReady: [offlineReady, setOfflineReady],
		needRefresh: [needRefresh, setNeedRefresh],
		updateServiceWorker
	} = useRegisterSW({
		onRegistered: res => {
			console.log("Service Worker Registered: ", res)
		},
		onRegisterError: error => {
			console.log("Service Worker Registration error", error)
		}
	})

	const handleClose = () => {
		setOfflineReady(false)
		setNeedRefresh(false)
	}

	return (
		<Snackbar
			open={offlineReady || needRefresh}
			TransitionComponent={Fade}
			autoHideDuration={7500}
			onClose={handleClose}
			message={offlineReady ? "App ready to work offline" : "An update is available!"}
			action={
				<>
					{needRefresh && (
						<Button
							color="primary"
							size="small"
							onClick={() => updateServiceWorker(true)}>
							Update
						</Button>
					)}
					<IconButton
						size="small"
						aria-label="close"
						color="inherit"
						onClick={handleClose}>
						<Close fontSize="small" />
					</IconButton>
				</>
			}
		/>
	)
}

export default _PWASnackbar
