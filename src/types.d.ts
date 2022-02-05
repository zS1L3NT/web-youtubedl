type iVideo = {
	id: string
	name: string
	format: "audioonly" | "videoandaudio"
	thumbnail: string
	bitrate: number
}

type iSearch = {
	url: string
	format: "audioonly" | "videoandaudio"
	time: number
}
