import { createContext, Dispatch, SetStateAction } from "react"

interface iResultsData {
	results: iResult[]
	setResults: Dispatch<SetStateAction<iResult[]>>
}

export default createContext<iResultsData>({
	results: [],
	setResults: () => {}
})
