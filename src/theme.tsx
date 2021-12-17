import { createTheme } from "@mui/material"

const palette = {
	success: {
		main: "#1db954"
	},
	error: {
		main: "#e22134"
	},
	warning: {
		main: "#ff5722"
	}
}

const theme = createTheme({
	palette: {
		...palette,
		primary: {
			main: "#e72c3a",
			contrastText: "#EEEEEE"
		},
		background: {
			default: "#EEEEEE"
		}
	}
})

export default theme
