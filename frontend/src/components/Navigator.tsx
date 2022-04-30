import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

const Navigator = (): JSX.Element => (
	<AppBar sx={{ bgcolor: "primary.main" }} position="relative">
		<Toolbar>
			<Typography variant="h6">YouTube DL</Typography>
		</Toolbar>
	</AppBar>
)

export default Navigator
