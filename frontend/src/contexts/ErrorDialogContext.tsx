import { createContext, Dispatch, SetStateAction } from "react"

interface iDialogData {
	isOpen: boolean
	text: string
	setIsOpen: Dispatch<SetStateAction<boolean>>
	setText: Dispatch<SetStateAction<string>>
}

export default createContext<iDialogData>({
	isOpen: false,
	text: "",
	setIsOpen: () => {},
	setText: () => {}
})
