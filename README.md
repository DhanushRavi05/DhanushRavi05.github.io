# Dhanush R — Portfolio Website (v3)

## What changed
Certificate upload is now built **directly into the main site** — no separate admin page.
Scroll to the Certifications section and you'll see a small link at the bottom right:
**"Owner? Add a certificate"**. Only you can actually use it.

## Files to upload to your repo
- `index.html` — replaces your old one
- `certificates.json` — replaces your old one (keep it if you already added certs, don't overwrite)
- Delete `admin.html` from your repo if it's there — not needed anymore

## How the upload option works
1. Scroll to **Certifications** on your live site
2. Click **"Owner? Add a certificate"** (bottom right, small text — easy to miss on purpose, so it doesn't look like a normal visitor button)
3. First time only: paste your **Owner Key** — this is the same GitHub token you already generated
   (starts with `github_pat_...`). Click **Unlock**.
4. Your browser remembers this key after that, only on this device — you won't need to paste it again
   next time, even after closing the tab. Click **"Log out of owner mode on this device"** if you ever
   want to clear it (e.g. before letting someone else use this computer).
5. Fill in Certificate Name, Issued By, Category (Course/Internship), Year
6. Click the **file box** and pick the certificate image or PDF from your computer
7. Click **Upload Certificate**
8. Within a minute, refresh the page — it appears live for everyone to see

## Why only you can use it
The button is there for anyone to see, but clicking "Unlock" without the correct key does nothing —
GitHub itself rejects any request that doesn't carry your token. Nobody else has that key, so nobody
else can add or change anything, even if they find the button.

## If you ever need a new Owner Key
1. Go to https://github.com/settings/tokens?type=beta
2. Generate new token (fine-grained) → Repository access: only `DhanushRavi05.github.io`
3. Permissions → Contents → Read and write → Generate
4. Copy the new key and paste it into the site's upload panel like before

## Want a .com domain later
`.com` domains cost around ₹700–900/year. Once bought, you can point it to this same free
GitHub Pages site — ask me when you're ready and I'll walk you through it.
