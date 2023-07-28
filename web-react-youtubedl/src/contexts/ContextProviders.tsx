import { PropsWithChildren, useState } from "react"

import ErrorDialogContext from "./ErrorDialogContext"
import ResultsContext from "./VideosContext"

const ContextProviders = ({ children }: PropsWithChildren) => {
	const [isOpen, setIsOpen] = useState(false)
	const [text, setText] = useState("")
	const [videos, setVideos] = useState<iVideo[]>([])

	return (
		<ErrorDialogContext.Provider
			value={{
				isOpen,
				text,
				setIsOpen,
				setMessage: setText
			}}>
			<ResultsContext.Provider value={{ videos, setVideos }}>
				{children}
			</ResultsContext.Provider>
		</ErrorDialogContext.Provider>
	)
}

export default ContextProviders
