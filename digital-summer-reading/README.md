# Digital Summer Reading printable webpage

Place these files together in one folder:

- `index.html`
- `style.css`
- `main.js`
- `image.png` — Springfield Township Library logo
- `assets/covers/` — supplied book cover images
- `assets/fonts/` — optional local font files

## Expected cover filenames

The page is already wired to look for these files:

- `assets/covers/the-geomagician.jpg`
- `assets/covers/boy-with-accidental-dinosaur.jpg`
- `assets/covers/the-memory-hunters.jpg`
- `assets/covers/a-rare-find.jpg`
- `assets/covers/follow-me-to-africa.jpg`
- `assets/covers/raiders-of-the-lost-heart.jpg`
- `assets/covers/the-secrets-beneath.jpg`
- `assets/covers/excavations.jpg`
- `assets/covers/the-last-remains.jpg`
- `assets/covers/the-meister-of-decimen-city.jpg`
- `assets/covers/the-fossil-hunter.jpg`
- `assets/covers/the-cretaceous-past.jpg`

If your supplied cover files use `.png` or different names, update the matching `src` values in `index.html`.

## Optional font filenames

The CSS is wired for these optional local font files:

- `assets/fonts/BebasNeue-Regular.woff2`
- `assets/fonts/OpenSauceOne-Regular.woff2`
- `assets/fonts/Kollektif.woff2`

If these files are not present, the page will use fallback fonts.

## Printing

Open `index.html` in a browser and print. The stylesheet is set for US Letter portrait, with four print pages and three books per page so descriptions stay readable.
