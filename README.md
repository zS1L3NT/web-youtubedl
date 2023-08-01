# YouTube DL

![License](https://img.shields.io/github/license/zS1L3NT/web-youtubedl?style=for-the-badge) ![Languages](https://img.shields.io/github/languages/count/zS1L3NT/web-youtubedl?style=for-the-badge) ![Top Language](https://img.shields.io/github/languages/top/zS1L3NT/web-youtubedl?style=for-the-badge) ![Commit Activity](https://img.shields.io/github/commit-activity/y/zS1L3NT/web-youtubedl?style=for-the-badge) ![Last commit](https://img.shields.io/github/last-commit/zS1L3NT/web-youtubedl?style=for-the-badge)

YouTube downloading website available [here](https://youtubedl.zectan.com/).
You can choose the download type (Audio or Video), paste the link and click Convert to fetch information about a video.
Once the video information loads, you can choose the filename (alphanumerical) then click Download to download.

## Motivation

Working YouTube downloaders without ads are becoming rarer nowadays because of copyright issues. I decided to build my own version of a YouTube video downloader so that I could use it for my personal use to download my own youtube videos.

## Features

-   Download Audio or Video from YouTube
	-	Audio downloads allow setting custom ID3 data
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
        -   [![@types/cors](https://img.shields.io/badge/%40types%2Fcors-%5E2.8.12-red?style=flat-square)](https://npmjs.com/package/@types/cors/v/2.8.12)
        -   [![@types/express](https://img.shields.io/badge/%40types%2Fexpress-%5E4.17.14-red?style=flat-square)](https://npmjs.com/package/@types/express/v/4.17.14)
        -   [![@types/fluent-ffmpeg](https://img.shields.io/badge/%40types%2Ffluent--ffmpeg-%5E2.1.20-red?style=flat-square)](https://npmjs.com/package/@types/fluent-ffmpeg/v/2.1.20)
        -   [![@types/node](https://img.shields.io/badge/%40types%2Fnode-latest-red?style=flat-square)](https://npmjs.com/package/@types/node/v/latest)
        -   [![@types/uuid](https://img.shields.io/badge/%40types%2Fuuid-%5E9.0.0-red?style=flat-square)](https://npmjs.com/package/@types/uuid/v/9.0.0)
        -   [![@typescript-eslint/eslint-plugin](https://img.shields.io/badge/%40typescript--eslint%2Feslint--plugin-latest-red?style=flat-square)](https://npmjs.com/package/@typescript-eslint/eslint-plugin/v/latest)
        -   [![@typescript-eslint/parser](https://img.shields.io/badge/%40typescript--eslint%2Fparser-latest-red?style=flat-square)](https://npmjs.com/package/@typescript-eslint/parser/v/latest)
        -   [![ts-node](https://img.shields.io/badge/ts--node-latest-red?style=flat-square)](https://npmjs.com/package/ts-node/v/latest)
        -   [![typescript](https://img.shields.io/badge/typescript-%5E5.1.6-red?style=flat-square)](https://npmjs.com/package/typescript/v/5.1.6)
    -   FFmpeg & YTDL
        -   [![@ffmpeg-installer/ffmpeg](https://img.shields.io/badge/%40ffmpeg--installer%2Fffmpeg-%5E1.1.0-red?style=flat-square)](https://npmjs.com/package/@ffmpeg-installer/ffmpeg/v/1.1.0)
        -   [![fluent-ffmpeg](https://img.shields.io/badge/fluent--ffmpeg-%5E2.1.2-red?style=flat-square)](https://npmjs.com/package/fluent-ffmpeg/v/2.1.2)
        -   [![node-id3](https://img.shields.io/badge/node--id3-%5E0.2.6-red?style=flat-square)](https://npmjs.com/package/node-id3/v/0.2.6)
        -   [![ytdl-core](https://img.shields.io/badge/ytdl--core-%5E4.11.5-red?style=flat-square)](https://npmjs.com/package/ytdl-core/v/4.11.5)
        -   [![ytmusic-api](https://img.shields.io/badge/ytmusic--api-%5E4.2.0-red?style=flat-square)](https://npmjs.com/package/ytmusic-api/v/4.2.0)
        -   [![ytpl](https://img.shields.io/badge/ytpl-%5E2.3.0-red?style=flat-square)](https://npmjs.com/package/ytpl/v/2.3.0)
    -   Express
        -   [![cors](https://img.shields.io/badge/cors-%5E2.8.5-red?style=flat-square)](https://npmjs.com/package/cors/v/2.8.5)
        -   [![express](https://img.shields.io/badge/express-%5E4.18.2-red?style=flat-square)](https://npmjs.com/package/express/v/4.18.2)
	-	ESLint
        -   [![eslint](https://img.shields.io/badge/eslint-latest-red?style=flat-square)](https://npmjs.com/package/eslint/v/latest)
        -   [![eslint-config-prettier](https://img.shields.io/badge/eslint--config--prettier-latest-red?style=flat-square)](https://npmjs.com/package/eslint-config-prettier/v/latest)
        -   [![eslint-plugin-simple-import-sort](https://img.shields.io/badge/eslint--plugin--simple--import--sort-latest-red?style=flat-square)](https://npmjs.com/package/eslint-plugin-simple-import-sort/v/latest)
        -   [![prettier](https://img.shields.io/badge/prettier-latest-red?style=flat-square)](https://npmjs.com/package/prettier/v/latest)
    -   Miscellaneous
        -   [![arktype](https://img.shields.io/badge/arktype-1.0.18--alpha-red?style=flat-square)](https://npmjs.com/package/arktype/v/1.0.18-alpha)
        -   [![colors](https://img.shields.io/badge/colors-%5E1.4.0-red?style=flat-square)](https://npmjs.com/package/colors/v/1.4.0)
        -   [![dotenv](https://img.shields.io/badge/dotenv-%5E16.0.3-red?style=flat-square)](https://npmjs.com/package/dotenv/v/16.0.3)
        -   [![no-try](https://img.shields.io/badge/no--try-%5E3.1.0-red?style=flat-square)](https://npmjs.com/package/no-try/v/3.1.0)
        -   [![tracer](https://img.shields.io/badge/tracer-%5E1.1.6-red?style=flat-square)](https://npmjs.com/package/tracer/v/1.1.6)
        -   [![uuid](https://img.shields.io/badge/uuid-%5E9.0.0-red?style=flat-square)](https://npmjs.com/package/uuid/v/9.0.0)
        -   [![validate-any](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-youtubedl/validate-any?style=flat-square&filename=web-express-youtubedl%2Fpackage.json)](https://npmjs.com/package/validate-any)
-   Frontend
    -   TypeScript
        -   [![@types/react](https://img.shields.io/badge/%40types%2Freact-%5E18.0.25-red?style=flat-square)](https://npmjs.com/package/@types/react/v/18.0.25)
        -   [![@types/react-dom](https://img.shields.io/badge/%40types%2Freact--dom-%5E18.0.9-red?style=flat-square)](https://npmjs.com/package/@types/react-dom/v/18.0.9)
        -   [![@typescript-eslint/eslint-plugin](https://img.shields.io/badge/%40typescript--eslint%2Feslint--plugin-latest-red?style=flat-square)](https://npmjs.com/package/@typescript-eslint/eslint-plugin/v/latest)
        -   [![@typescript-eslint/parser](https://img.shields.io/badge/%40typescript--eslint%2Fparser-latest-red?style=flat-square)](https://npmjs.com/package/@typescript-eslint/parser/v/latest)
        -   [![ts-node](https://img.shields.io/badge/ts--node-latest-red?style=flat-square)](https://npmjs.com/package/ts-node/v/latest)
        -   [![typescript](https://img.shields.io/badge/typescript-%5E5.1.6-red?style=flat-square)](https://npmjs.com/package/typescript/v/5.1.6)
    -   Vite
        -   [![@vitejs/plugin-react](https://img.shields.io/badge/%40vitejs%2Fplugin--react-%5E2.2.0-red?style=flat-square)](https://npmjs.com/package/@vitejs/plugin-react/v/2.2.0)
        -   [![vite](https://img.shields.io/badge/vite-%5E3.2.4-red?style=flat-square)](https://npmjs.com/package/vite/v/3.2.4)
        -   [![vite-plugin-pwa](https://img.shields.io/badge/vite--plugin--pwa-%5E0.13.3-red?style=flat-square)](https://npmjs.com/package/vite-plugin-pwa/v/0.13.3)
        -   [![workbox-build](https://img.shields.io/badge/workbox--build-%5E6.5.4-red?style=flat-square)](https://npmjs.com/package/workbox-build/v/6.5.4)
        -   [![workbox-core](https://img.shields.io/badge/workbox--core-%5E6.5.4-red?style=flat-square)](https://npmjs.com/package/workbox-core/v/6.5.4)
        -   [![workbox-routing](https://img.shields.io/badge/workbox--routing-%5E6.5.4-red?style=flat-square)](https://npmjs.com/package/workbox-routing/v/6.5.4)
        -   [![workbox-strategies](https://img.shields.io/badge/workbox--strategies-%5E6.5.4-red?style=flat-square)](https://npmjs.com/package/workbox-strategies/v/6.5.4)
        -   [![workbox-window](https://img.shields.io/badge/workbox--window-%5E6.5.4-red?style=flat-square)](https://npmjs.com/package/workbox-window/v/6.5.4)
    -   React
        -   [![react](https://img.shields.io/badge/react-%5E18.2.0-red?style=flat-square)](https://npmjs.com/package/react/v/18.2.0)
        -   [![react-dom](https://img.shields.io/badge/react--dom-%5E18.2.0-red?style=flat-square)](https://npmjs.com/package/react-dom/v/18.2.0)
    -   Mantine
        -   [![@mantine/core](https://img.shields.io/badge/%40mantine%2Fcore-%5E6.0.17-red?style=flat-square)](https://npmjs.com/package/@mantine/core/v/6.0.17)
        -   [![@mantine/form](https://img.shields.io/badge/%40mantine%2Fform-%5E6.0.17-red?style=flat-square)](https://npmjs.com/package/@mantine/form/v/6.0.17)
        -   [![@mantine/hooks](https://img.shields.io/badge/%40mantine%2Fhooks-%5E6.0.17-red?style=flat-square)](https://npmjs.com/package/@mantine/hooks/v/6.0.17)
        -   [![@mantine/notifications](https://img.shields.io/badge/%40mantine%2Fnotifications-%5E6.0.17-red?style=flat-square)](https://npmjs.com/package/@mantine/notifications/v/6.0.17)
        -   [![@tabler/icons-react](https://img.shields.io/badge/%40tabler%2Ficons--react-%5E2.29.0-red?style=flat-square)](https://npmjs.com/package/@tabler/icons-react/v/2.29.0)
	-	ESLint
        -   [![eslint](https://img.shields.io/badge/eslint-latest-red?style=flat-square)](https://npmjs.com/package/eslint/v/latest)
        -   [![eslint-config-prettier](https://img.shields.io/badge/eslint--config--prettier-latest-red?style=flat-square)](https://npmjs.com/package/eslint-config-prettier/v/latest)
        -   [![eslint-plugin-react](https://img.shields.io/badge/eslint--plugin--react-latest-red?style=flat-square)](https://npmjs.com/package/eslint-plugin-react/v/latest)
        -   [![eslint-plugin-simple-import-sort](https://img.shields.io/badge/eslint--plugin--simple--import--sort-latest-red?style=flat-square)](https://npmjs.com/package/eslint-plugin-simple-import-sort/v/latest)
        -   [![prettier](https://img.shields.io/badge/prettier-latest-red?style=flat-square)](https://npmjs.com/package/prettier/v/latest)
    -   Miscellaneous
        -   [![axios](https://img.shields.io/badge/axios-%5E1.2.0-red?style=flat-square)](https://npmjs.com/package/axios/v/1.2.0)
