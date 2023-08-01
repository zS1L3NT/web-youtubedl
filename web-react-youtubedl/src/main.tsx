import axios from "axios"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { AppShell, Header, MantineProvider, Title } from "@mantine/core"
import { Notifications } from "@mantine/notifications"

import App from "./App"
import ContextProviders from "./contexts/ContextProviders"

import "./index.css"

if (import.meta.env.DEV) {
	axios.defaults.baseURL = "http://localhost:8080"
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<MantineProvider
			withNormalizeCSS
			withGlobalStyles
			theme={{ primaryColor: "red" }}>
			<Notifications />
			<ContextProviders>
				<AppShell
					header={
						<Header
							height={60}
							sx={{ alignItems: "center" }}
							display="flex"
							bg="red">
							<Title
								order={4}
								ml="lg"
								color="white">
								Youtube DL
							</Title>
						</Header>
					}>
					<App />
				</AppShell>
			</ContextProviders>
		</MantineProvider>
	</StrictMode>,
)
