# YouTube DL

![License](https://img.shields.io/github/license/zS1L3NT/web-youtubedl?style=for-the-badge) ![Languages](https://img.shields.io/github/languages/count/zS1L3NT/web-youtubedl?style=for-the-badge) ![Top Language](https://img.shields.io/github/languages/top/zS1L3NT/web-youtubedl?style=for-the-badge) ![Commit Activity](https://img.shields.io/github/commit-activity/y/zS1L3NT/web-youtubedl?style=for-the-badge) ![Last commit](https://img.shields.io/github/last-commit/zS1L3NT/web-youtubedl?style=for-the-badge)

YouTube downloading website available [here](https://youtubedl.zectan.com/).
You can choose the download type (Audio or Video), paste the link and click Convert to fetch information about a video.
Once the video information loads, you can choose the filename (alphanumerical) then click Download to download.

## Motivation

Working YouTube downloaders without ads are becoming rarer nowadays because of copyright issues. I decided to build my own version of a YouTube video downloader so that I could use it for my personal use to download my own youtube videos.

## Features

-   Download Audio or Video from YouTube
-   Progressive Web Application
-   Mobile Responsive website

## Usage

```
$ npm i
$ npm run dev
```

## Built with

-   Backend
    -   TypeScript
        -   [![@types/express](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/dev/@types/express?style=flat-square)](https://npmjs.com/package/@types/express)
        -   [![@types/fluent-ffmpeg](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/dev/@types/fluent-ffmpeg?style=flat-square)](https://npmjs.com/package/@types/fluent-ffmpeg)
        -   [![@types/uuid](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/@types/uuid?style=flat-square)](https://npmjs.com/package/@types/uuid)
        -   [![typescript](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/dev/typescript?style=flat-square)](https://npmjs.com/package/typescript)
    -   FFmpeg & YTDL
        -   [![@ffmpeg-installer/ffmpeg](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/@ffmpeg-installer/ffmpeg?style=flat-square)](https://npmjs.com/package/@ffmpeg-installer/ffmpeg)
        -   [![fluent-ffmpeg](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/fluent-ffmpeg?style=flat-square)](https://npmjs.com/package/fluent-ffmpeg)
        -   [![ytdl-core](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/ytdl-core?style=flat-square)](https://npmjs.com/package/ytdl-core)
    -   Express
        -   [![express](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/express?style=flat-square)](https://npmjs.com/package/express)
    -   Miscellaneous
        -   [![colors](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/colors?style=flat-square)](https://npmjs.com/package/colors)
        -   [![dotenv](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/dotenv?style=flat-square)](https://npmjs.com/package/dotenv)
        -   [![no-try](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/no-try?style=flat-square)](https://npmjs.com/package/no-try)
        -   [![tracer](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/tracer?style=flat-square)](https://npmjs.com/package/tracer)
        -   [![uuid](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/uuid?style=flat-square)](https://npmjs.com/package/uuid)
        -   [![validate-any](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/validate-any?style=flat-square)](https://npmjs.com/package/validate-any)
-   Frontend
    -   TypeScript
        -   [![@types/react](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/dev/@types/react?style=flat-square)](https://npmjs.com/package/@types/react)
        -   [![@types/react-dom](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/dev/@types/react-dom?style=flat-square)](https://npmjs.com/package/@types/react-dom)
        -   [![typescript](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/dev/typescript?style=flat-square)](https://npmjs.com/package/typescript)
    -   Vite
        -   [![@vitejs/plugin-react](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/dev/@vitejs/plugin-react?style=flat-square)](https://npmjs.com/package/@vitejs/plugin-react)
        -   [![vite](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/dev/vite?style=flat-square)](https://npmjs.com/package/vite)
        -   [![vite-plugin-pwa](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/dev/vite-plugin-pwa?style=flat-square)](https://npmjs.com/package/vite-plugin-pwa)
        -   [![workbox-build](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/dev/workbox-build?style=flat-square)](https://npmjs.com/package/workbox-build)
        -   [![workbox-core](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/dev/workbox-core?style=flat-square)](https://npmjs.com/package/workbox-core)
        -   [![workbox-routing](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/dev/workbox-routing?style=flat-square)](https://npmjs.com/package/workbox-routing)
        -   [![workbox-strategies](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/dev/workbox-strategies?style=flat-square)](https://npmjs.com/package/workbox-strategies)
        -   [![workbox-window](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/dev/workbox-window?style=flat-square)](https://npmjs.com/package/workbox-window)
    -   React
        -   [![react](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/react?style=flat-square)](https://npmjs.com/package/react)
        -   [![react-dom](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/react-dom?style=flat-square)](https://npmjs.com/package/react-dom)
    -   MUI
        -   [![@emotion/react](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/@emotion/react?style=flat-square)](https://npmjs.com/package/@emotion/react)
        -   [![@emotion/styled](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/@emotion/styled?style=flat-square)](https://npmjs.com/package/@emotion/styled)
        -   [![@mui/icons-material](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/@mui/icons-material?style=flat-square)](https://npmjs.com/package/@mui/icons-material)
        -   [![@mui/material](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/@mui/material?style=flat-square)](https://npmjs.com/package/@mui/material)
    -   Miscellaneous
        -   [![axios](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/axios?style=flat-square)](https://npmjs.com/package/axios)
