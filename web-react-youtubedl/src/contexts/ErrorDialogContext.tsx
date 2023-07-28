import { createContext, Dispatch, SetStateAction } from "react"

export default createContext<{
	isOpen: boolean
	text: string
	setIsOpen: Dispatch<SetStateAction<boolean>>
	setMessage: Dispatch<SetStateAction<string>>
}>({
	isOpen: false,
	text: "",
	setIsOpen: () => {},
	setMessage: () => {}
})
