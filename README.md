# Dhanush R — Portfolio Website (v4 — multi-page)

## What changed
- Every section is now its own real page: `index.html`, `about.html`, `education.html`,
  `skills.html`, `projects.html`, `certifications.html`, `contact.html`
- Nav bar links go straight to these pages (not scrolling anchors anymore)
- Shared design lives in `styles.css` and shared logic in `main.js` — every page pulls from these
  two files, so you only ever edit one place to change the look or behavior everywhere
- On the home page, the old "skip" button is now **"🤝 Make a friend"** — clicking it opens a small
  form (name + optional message), then opens the visitor's email app with a pre-filled friend request
  addressed to you
- Certificate upload still works the same way, now on its own `certifications.html` page

## Files to upload to your repo
Upload **all of these together** (all 10 files):
```
index.html
about.html
education.html
skills.html
projects.html
certifications.html
contact.html
styles.css
main.js
certificates.json
```

⚠️ **Important**: if you already added real certificates before, **don't overwrite** your existing
`certificates.json` — keep the one with your data instead of this empty one.

Also delete any of these old files from your repo if still there (no longer used):
`admin.html`

## How to upload (same as before)
1. Go to `github.com/DhanushRavi05/DhanushRavi05.github.io`
2. **Add file → Upload files**
3. Drag and drop all the files listed above
4. Commit changes
5. Wait 1–2 minutes, then visit `https://dhanushravi05.github.io`

## How "Make a friend" works
- Visitor clicks **🤝 Make a friend** on your homepage
- A small popup asks for their name and an optional message
- Clicking **Send Request** opens their email app with a message already written, addressed to
  `dhanushravi1485@gmail.com` — they just hit send
- No setup needed on your end, it uses their own email app

## How certificate upload still works
Same as before — go to `certifications.html`, click **"Owner? Add a certificate"**, unlock with your
GitHub owner key (same one you already created), then upload the certificate image/PDF directly.
Full details in the previous instructions still apply.

## Want a .com domain later
`.com` domains cost around ₹700–900/year. Once bought, you can point it to this same free
GitHub Pages site — ask me when you're ready and I'll walk you through it.
