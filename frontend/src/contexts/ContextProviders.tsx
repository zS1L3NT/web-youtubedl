import ErrorDialogContext from "./ErrorDialogContext"
import ResultsContext from "./ResultsContext"
import { useState } from "react"

const ContextProviders = (props: React.PropsWithChildren<{}>) => {
	const [isOpen, setIsOpen] = useState(false)
	const [text, setText] = useState("")
	const [results, setResults] = useState<iResult[]>([])

	return (
		<ErrorDialogContext.Provider
			value={{
				isOpen,
				text,
				setIsOpen,
				setText
			}}>
			<ResultsContext.Provider
				value={{
					results,
					setResults
				}}>
				{props.children}
			</ResultsContext.Provider>
		</ErrorDialogContext.Provider>
	)
}

export default ContextProviders
