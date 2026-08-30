# Surf Fed Extensions — Add to FED Play App Store

## Clarify
- [x] Get details from user: FED-GRAM extension (Streamlit social media downloader), live URLs verified, "why not both" = link hosted + GitHub

## Assets
- [x] Verify Streamlit + GitHub URLs are reachable
- [ ] Generate Surf Fed logo icon

## Build
- [ ] Add `extensions` tab to TABS array in data.js
- [ ] Add `extensions` chip to CHIPS array in data.js
- [ ] Add extension apps to APPS array (FED-GRAM + placeholders for future extensions)
- [ ] Add `btn-extension` button color class to styles.css
- [ ] Update getCategoryLabel / getCategoryEmoji in app.js for extensions
- [ ] Update getButtonClass in app.js for extensions
- [ ] Update getFilteredApps in app.js to gate `extensions` tab
- [ ] Create extensions.html page
- [ ] Add "Open" button action for Streamlit hosted extensions (app.js)

## Verify
- [ ] Extensions page loads, sidebar nav works
- [ ] Extension apps render with correct button style + Open action
- [ ] Search/filter/dark mode work on extensions page
- [ ] Final preview shared with user
