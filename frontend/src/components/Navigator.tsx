import { AppBar, Toolbar, Typography } from "@mui/material"

const Navigator = (): JSX.Element => (
	<AppBar sx={{ bgcolor: "primary.main" }} position="relative">
		<Toolbar>
			<Typography variant="h6">YouTube DL</Typography>
		</Toolbar>
	</AppBar>
)

export default Navigator
