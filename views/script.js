const $ = document.querySelector.bind(document)
const error_message = $(".toast-error-body")
const error_toast = new bootstrap.Toast($(".toast-error"))
const clipboard_toast = new bootstrap.Toast($(".toast-clipboard"))
const spinner = $(".spinner")
const convert_button = $(".btn-convert")

const convert_filter = async title => {
	switch (title) {
		case "Video":
			convert_one("videoandaudio")
			break
		case "Audio":
			convert_one("audioonly")
			break
		default:
			break
	}
}

const convert_one = format => {
	const url = $(".input-url").value
	const name = $(".input-name").value

	if (!url) {
		error_message.textContent = "Must enter a YouTube URL!"
		error_toast.show()
		return
	}

	error_toast.hide()
	spinner.classList.remove("d-none")
	convert_button.disabled = true

	const xhr = new XMLHttpRequest()
	xhr.open("POST", "/verify_video", true)
	xhr.setRequestHeader("Content-Type", "application/json")
	xhr.send(
		JSON.stringify({
			url,
			name,
			format
		})
	)
	xhr.onload = () => {
		spinner.classList.add("d-none")
		convert_button.disabled = false

		if (xhr.responseText) {
			error_message.textContent = xhr.responseText
			error_toast.show()
		} else {
			window.location.href = `/download?url=${encodeURI(
				url
			)}&format=${format}&name=${encodeURI(name)}`
		}
	}
}

navigator.clipboard?.readText().then(text => {
	$(".input-url").value = text
	clipboard_toast.show()
})

$(".undo-clipboard").addEventListener("click", () => {
	$(".input-url").value = ""
	clipboard_toast.hide()
})