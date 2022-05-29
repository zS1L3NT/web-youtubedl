import { createContext, Dispatch, SetStateAction } from "react"

interface iVideosData {
	videos: iVideo[]
	setVideos: Dispatch<SetStateAction<iVideo[]>>
}

export default createContext<iVideosData>({
	videos: [],
	setVideos: () => {}
})
