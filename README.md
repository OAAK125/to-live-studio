# To Live Studio — static front-end site
HTML5 + CSS3 + vanilla JS. No build step: open `index.html` or run `python3 -m http.server`.

## Update content
- Projects: `PROJECTS` array at the top of `js/script.js` (title, description, technologies, features, demoUrl, image).
- Colours/fonts: CSS variables at the top of `css/styles.css`.
- Screenshots: project screenshots are stored in `assets/images/`, shown below the hero and on each project card.

## Contact form
The contact form uses Netlify Forms (`data-netlify="true"`). Deploy the static site to Netlify to enable submissions; submissions can then be managed in the site's Netlify dashboard.
