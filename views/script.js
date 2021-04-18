const app = new Vue({
	el: "#app",
	data: {
		url: "",
		convert_spinner_class: "d-none",
		zip_spinner_class: "d-none",
		error_message: "",
		files: []
	},
	mounted: function () {
		this.paste_clipboard()
	},
	methods: {
		convert_filter: function (title) {
			switch (title) {
				case "Video":
					this.convert_one("videoandaudio", this.url).then(() => {
						this.convert_spinner_class = "d-none"
					})
					break
				case "Audio":
					this.convert_one("audioonly", this.url).then(() => {
						this.convert_spinner_class = "d-none"
					})
					break
				case "Video Playlist":
					this.convert_playlist("videoandaudio")
					break
				case "Audio Playlist":
					this.convert_playlist("audioonly")
					break
				default:
					break
			}
		},
		convert_one: function (format, url) {
			return new Promise((res, rej) => {
				if (!url) {
					this.error_message = "Must enter a YouTube URL!"
					error_toast.show()
					rej()
					return
				}

				error_toast.hide()
				this.convert_spinner_class = ""

				const xhr = new XMLHttpRequest()
				xhr.open("POST", "/verify_video", true)
				xhr.setRequestHeader("Content-Type", "application/json")
				xhr.send(
					JSON.stringify({
						url,
						format
					})
				)
				xhr.onload = () => {
					if (xhr.status === 400) {
						this.convert_spinner_class = "d-none"
						this.error_message = xhr.responseText
						error_toast.show()
						rej()
					} else {
						const { name, thumbnail } = JSON.parse(xhr.responseText)
						this.files.push({
							name,
							url,
							thumbnail,
							spinner_class: "d-none"
						})
						this.url = ""
						res()
					}
				}
			})
		},
		convert_playlist: async function (format) {
			if (!this.url) {
				this.error_message = "Must enter a YouTube URL!"
				error_toast.show()
				return
			}

			error_toast.hide()
			this.convert_spinner_class = ""

			const xhr = new XMLHttpRequest()
			xhr.open("POST", "/verify_playlist", true)
			xhr.setRequestHeader("Content-Type", "application/json")
			xhr.send(JSON.stringify({ url: this.url }))
			xhr.onload = () => {
				if (xhr.status === 400) {
					this.convert_spinner_class = "d-none"
					this.error_message = xhr.responseText
					error_toast.show()
				} else {
					const videos = JSON.parse(xhr.responseText)
					const conversions = videos.map(video =>
						this.convert_one(format, video)
					)
					Promise.all(conversions)
						.then(() => {
							this.convert_spinner_class = "d-none"
						})
						.catch(() => {})
				}
			}
		},
		download_all: function (format) {
			this.zip_spinner_class = ""

			const xhr = new XMLHttpRequest()
			xhr.open("POST", "/cache_zip", true)
			xhr.setRequestHeader("Content-Type", "application/json")
			xhr.send(
				JSON.stringify({
					files: this.files.map(file => ({
						name: file.name,
						url: file.url
					})),
					format
				})
			)
			xhr.onload = () => {
				this.zip_spinner_class = "d-none"
				if (xhr.status === 400) {
					this.error_message = xhr.responseText
					error_toast.show()
				} else {
					window.location.href = `/download_cache?id=${xhr.responseText}`
				}
			}
		},
		download_one: function (i, format) {
			const { name, url } = this.files[i]

			this.files[i].spinner_class = ""

			const xhr = new XMLHttpRequest()
			xhr.open("POST", "/verify_name", true)
			xhr.setRequestHeader("Content-Type", "application/json")
			xhr.send(JSON.stringify({ name }))
			xhr.onload = () => {
				this.files[i].spinner_class = "d-none"
				if (xhr.status === 400) {
					this.error_message = xhr.responseText
					error_toast.show()
				} else {
					window.location.href = `/download_file?url=${encodeURI(
						url
					)}&format=${format}&name=${encodeURI(name)}`
				}
			}
		},
		remove_one: function (i) {
			this.files.splice(i, 1)
		},
		paste_clipboard: function () {
			navigator.clipboard?.readText().then(text => {
				this.url = text
				clipboard_toast.show()
			})
		},
		undo_clipboard: function () {
			this.url = ""
			clipboard_toast.hide()
		}
	}
})

const $ = document.querySelector.bind(document)
const error_toast = new bootstrap.Toast($(".toast-error"))
const clipboard_toast = new bootstrap.Toast($(".toast-clipboard"))
