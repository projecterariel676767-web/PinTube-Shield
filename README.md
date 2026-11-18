# PinTube Shield

A personal, local Chrome extension prototype for filtering selected advertising network requests initiated by YouTube pages.

## Current scope

- Chrome extension using Manifest V3.
- Local popup to enable or disable the filtering rules.
- Dynamic network rules restricted to requests initiated by YouTube.
- GitHub Actions packages the extension as a downloadable ZIP artifact.

## Important limitations

This is an experimental filter, not a guarantee of an ad-free YouTube experience. YouTube can serve ads through first-party infrastructure or change its delivery mechanisms. Network rules may also affect some embedded content. If playback or site functionality breaks, disable PinTube Shield from the extension popup or remove the extension.

This project does not modify YouTube, intercept encrypted traffic, collect browsing history, or send browsing data to a server.

## Install

1. Download the `PinTubeShield-chrome-extension` artifact from the latest successful GitHub Actions run.
2. Extract the ZIP file.
3. Open `chrome://extensions` in Google Chrome.
4. Enable **Developer mode**.
5. Select **Load unpacked** and choose the extracted `extension` folder.

## Development

The extension source is in `extension/`. The GitHub Actions workflow validates the manifest and packages the extension whenever changes are pushed to the default branch or the workflow is manually started.
