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
					this.convert_single(this.url).then(() => {
						this.convert_spinner_class = "d-none"
					})
					break
				case "Audio (MP3)":
					this.convert_single(this.url).then(() => {
						this.convert_spinner_class = "d-none"
					})
					break
				case "Video Playlist":
					this.convert_playlist()
					break
				case "Audio (WEBM) Playlist":
					this.convert_playlist()
					break
				default:
					break
			}
		},
		convert_single: function (url) {
			return new Promise((resolve, reject) => {
				if (!url) {
					this.error_message = "Must enter a YouTube URL!"
					error_toast.show()
					rej()
					return
				}

				error_toast.hide()
				this.convert_spinner_class = ""

				axios
					.post("/verify_single", { url })
					.then(res => {
						const { name, thumbnail, bitrate } = res.data
						this.files.push({
							name,
							url,
							thumbnail,
							bitrate,
							spinner_class: "d-none"
						})
						this.url = ""
						resolve()
					})
					.catch(err => {
						this.convert_spinner_class = "d-none"
						this.error_message = err.response.data
						error_toast.show()
						reject()
					})
			})
		},
		convert_playlist: async function () {
			if (!this.url) {
				this.error_message = "Must enter a YouTube URL!"
				error_toast.show()
				return
			}

			error_toast.hide()
			this.convert_spinner_class = ""

			axios
				.post("/verify_playlist", {url: this.url})
				.then(res => {
					const videos = res.data
					const conversions = videos.map(video =>
						this.convert_single(video)
					)
					Promise.allSettled(conversions).then(() => {
						this.convert_spinner_class = "d-none"
					})
				})
				.catch(err => {
					this.convert_spinner_class = "d-none"
					this.error_message = err.response.data
					error_toast.show()
				})
		},
		download_all: function (format) {
			this.zip_spinner_class = ""

			axios
				.post("/cache_playlist_data", {
					files: this.files.map(file => ({
						name: file.name,
						url: file.url
					})),
					format
				})
				.then(res => {
					this.zip_spinner_class = "d-none"
					window.location.href = `/download_playlist?id=${res.data}`
				})
				.catch(err => {
					this.zip_spinner_class = "d-none"
					this.error_message = err.response.data
					error_toast.show()
				})
		},
		download_one: function (i, format) {
			const { name, url, bitrate } = this.files[i]

			this.files[i].spinner_class = ""

			axios
				.post("/verify_name", { name })
				.then(() => {
					this.files[i].spinner_class = "d-none"
					window.location.href =
						`/download_single?` +
						this.createGetParams({
							url,
							format,
							name,
							bitrate
						})
				})
				.catch(err => {
					this.files[i].spinner_class = "d-none"
					this.error_message = err.response.data
					error_toast.show()
				})
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
		},
		createGetParams: function (data) {
			const ret = []
			for (let d in data)
				ret.push(
					encodeURIComponent(d) + "=" + encodeURIComponent(data[d])
				)
			return ret.join("&")
		}
	}
})

const $ = document.querySelector.bind(document)
const error_toast = new bootstrap.Toast($(".toast-error"))
const clipboard_toast = new bootstrap.Toast($(".toast-clipboard"))
