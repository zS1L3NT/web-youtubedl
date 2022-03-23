type iVideo = {
	id: string
	name: string
	format: "audioonly" | "videoandaudio"
	thumbnail: string
	bitrate: number
}

type iResult = {
	url: string
	format: "audioonly" | "videoandaudio"
	time: number
}
