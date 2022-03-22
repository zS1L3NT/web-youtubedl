import { createContext } from "react"

interface iDialogData {
	isOpen: boolean
	text: string
	setIsOpen: (isOpen: boolean) => void
	setText: (text: string) => void
}

export default createContext<iDialogData>({
	isOpen: false,
	text: "",
	setIsOpen: () => {},
	setText: () => {}
})
