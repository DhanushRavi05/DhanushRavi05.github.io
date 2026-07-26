# Dhanush R — Portfolio Website (v2)

## What's new in this version
- Fullscreen "booting up" terminal animation plays when the site loads
- Every section (About, Education, Skills, Projects, Certifications, Contact) is now a full-page view with smooth scroll-snap — nav links jump straight to them and highlight as you scroll
- Certifications split into **Courses Completed** and **Internships**
- Contact section explicitly invites collaboration/partnership requests
- Instagram (@iamdhanushhere) added to Contact
- **Secure owner-only certificate upload** via `admin.html` — see below

## Files
- `index.html` — the live website
- `certificates.json` — certificate data (auto-updated by admin.html, don't hand-edit unless you're comfortable with JSON)
- `admin.html` — **your private upload tool**. Not linked anywhere on the public site.

## Update your existing repo
1. Go to your repo: `github.com/DhanushRavi05/DhanushRavi05.github.io`
2. Upload these 3 files (drag and drop, same as before) — this will replace the old `index.html`
   and add `certificates.json` + `admin.html`. Commit changes.
3. Delete the old `certificates.js` and `admin-add-certificate.html` files from the repo if they're still there (open each → trash icon → commit).
4. Wait 1–2 minutes, refresh `https://dhanushravi05.github.io`

## How certificate upload actually works (owner-only, for real)
Since this is a free static site, there's no login system in the traditional sense — but here's what
makes it genuinely secure: `admin.html` only works if **you** paste in your own GitHub Personal Access
Token. Without that exact token, GitHub itself refuses every request — so even if someone finds the
`admin.html` link, they can't do anything with it.

### One-time setup: create your token
1. Go to https://github.com/settings/tokens?type=beta
2. Click **Generate new token**
3. Under **Repository access**, choose **Only select repositories** → pick `DhanushRavi05.github.io`
4. Under **Permissions → Repository permissions**, set **Contents** to **Read and write**
5. Click **Generate token**
6. **Copy the token immediately** (starts with `github_pat_...`) — GitHub shows it only once
7. Save it somewhere private (like a note on your phone) — you'll paste it into `admin.html` each time you want to add a certificate

### Adding a certificate
1. Open `https://dhanushravi05.github.io/admin.html` (bookmark this — it's not in your site's menu)
2. Paste your token → click **Unlock**
3. Fill in certificate name, issuer, category (Course/Internship), year, and an optional link
4. Click **Add Certificate**
5. Within a minute, it appears live on your site for everyone to see — automatically, no manual file editing needed

### Keeping it secure
- Never share your token with anyone or paste it anywhere except `admin.html`
- If you ever think it's been exposed, go back to the tokens page and delete/regenerate it
- The token only stays in your browser tab while it's open — closing the tab clears it

## Want an actual .com domain later?
`.com` domains cost around ₹700–900/year (Namecheap, GoDaddy). Once bought, you can point it to this
same free GitHub Pages site at no extra hosting cost. Ask me when you're ready.
