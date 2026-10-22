# To Live Studio — static front-end site
HTML5 + CSS3 + vanilla JS. No build step: open `index.html` or run `python3 -m http.server`.

## Update content
- Projects: `PROJECTS` array at the top of `js/script.js` (title, description, technologies, features, demoUrl, image).
- Colours/fonts: CSS variables at the top of `css/styles.css`.
- Screenshots: project screenshots are stored in `assets/images/`, shown below the hero and on each project card.

## Connect the contact form later
`handleValidSubmission()` in `js/script.js` is the single hook. Replace it with a `fetch` POST to your chosen endpoint (form service, serverless function or email API), handle success/error states honestly, and add a privacy note.
