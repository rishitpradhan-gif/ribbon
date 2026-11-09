# Ribbon

A photo-to-palette textile maker with downloadable woven keepsakes.

**[Try it now](https://ribbon-rishit.rishit-pradhan.chatgpt.site)** · [Download locally](https://github.com/rishitpradhan-gif/ribbon/releases/latest) · [Figma design](https://www.figma.com/design/DBcxizG8kBipgkuMaUv2TU?node-id=3-149)

![Working interface](docs/screenshots/desktop.png)

[Original Figma composition](docs/figma-design.png) · [Mobile interface](docs/screenshots/mobile.png)

## Try it

Choose a photo or start with the illustrated seaside palette. Change the title, edit individual thread colors, adjust the weave, shuffle, and save an SVG. Photos are sampled locally at no more than 128 pixels on their longest side. The palette uses weighted color quantization, not an AI model. JPEG/PNG/WebP/AVIF/GIF are accepted where the browser can decode them; only the decoded frame is sampled. Files are capped at 12 MiB and 32 megapixels. Transparent images need visible pixels. Exported files contain color paths and the title, not the source photo. This is a decorative interlacing pattern, not a loom-ready fabrication specification.

## Run the download

Download the local ZIP from Releases, extract it, and open a terminal in the folder containing `serve.py`:

```sh
python3 serve.py
```

On Windows use `py -3 serve.py`. Open http://127.0.0.1:8000. Python 3.10+ is enough; no npm installation is needed for the prebuilt download. Keep the terminal open; Ctrl+C stops it. Use `--port 8001` if port 8000 is busy.

## Develop

Node.js 22.17+, npm:

```sh
npm ci
npm run dev
node --test engine/test.mjs
npm run build
```

For a portable build: `node node_modules/vite/bin/vite.js build --config standalone/vite.config.mjs`. The website uses the supported Sites/Vinext starter; the portable build uses the same React view and engine in a static shell.

## Privacy and implementation

Phrase/photo processing happens in this browser. No file upload, microphone, account, API key, or external inference service is required. The website loads typefaces from Google Fonts; an offline download falls back to local serif/sans-serif fonts. Exported SVG text uses portable font fallbacks. Supported browsers need SVG, downloads, modern JavaScript, and (for playback) Web Audio; photo extraction also needs ImageBitmap/Canvas support.

## Design and provenance

The editable Figma file was created and visually checked before the website implementation. See docs/design.md for the design-to-code handoff limitation. Rishit Pradhan directed the work; implementation and design construction were AI-assisted. These are original small software implementations using established sonification, synthesis, quantization, and SVG techniques; worldwide novelty is not claimed.

MIT licensed; dependency and typeface licenses remain their own.

## Verification

Engine tests and real headless Chrome interaction checks passed, including playback/photo input, downloaded exports, mobile overflow, and reduced motion where applicable. Screenshots and browser-verification.json are in docs/. The interactive browser tool was unavailable due to a workspace symlink; the existing Playwright/Chrome harness completed the checks.
