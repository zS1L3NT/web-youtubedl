import { useEffect } from "react"
import { useRegisterSW } from "virtual:pwa-register/react"

import { notifications } from "@mantine/notifications"

const PWANotification = () => {
	const {
		offlineReady: [offlineReady, setOfflineReady],
		needRefresh: [needRefresh, setNeedRefresh],
		updateServiceWorker,
	} = useRegisterSW({
		onRegistered: res => {
			console.log("Service Worker Registered: ", res)
		},
		onRegisterError: error => {
			console.log("Service Worker Registration error", error)
		},
	})

	useEffect(() => {
		if (offlineReady || needRefresh) {
			if (needRefresh) updateServiceWorker(true)

			notifications.show({
				message: offlineReady ? "App ready to work offline" : "An update is available!",
				autoClose: 7500,
				onClose: handleClose,
			})
		}
	}, [offlineReady, needRefresh])

	const handleClose = () => {
		setOfflineReady(false)
		setNeedRefresh(false)
	}

	return <></>
}

export default PWANotification
