import { createContext, Dispatch, SetStateAction } from "react"

export default createContext<{
	videos: iVideo[]
	setVideos: Dispatch<SetStateAction<iVideo[]>>
}>({
	videos: [],
	setVideos: () => {}
})
