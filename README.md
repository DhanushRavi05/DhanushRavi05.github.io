# Dhanush R — Portfolio Website

Files in this folder:
- `index.html` — your main website
- `certificates.js` — certificate data (only you edit this)
- `admin-add-certificate.html` — local tool to generate certificate code (open it in your browser, don't upload it to the live site)

## Go live for free in ~5 minutes (GitHub Pages)

Your free URL will be: **`https://dhanushravi05.github.io`**

1. Go to https://github.com/DhanushRavi05 (you're already logged in here)
2. Click **New repository** (top right, `+` icon)
3. Repository name must be exactly: `DhanushRavi05.github.io`
   (this special name makes it your main free site — must match your username exactly)
4. Set it to **Public**, don't add a README, click **Create repository**
5. On the new repo page, click **uploading an existing file**
6. Drag and drop `index.html` and `certificates.js` (not the admin tool)
7. Click **Commit changes**
8. Go to repo **Settings → Pages** (left sidebar)
9. Under "Build and deployment", Source: **Deploy from a branch**, Branch: **main** → **Save**
10. Wait 1–2 minutes, then visit **https://dhanushravi05.github.io** — your site is live!

Anyone with the link can visit and view it. Only you (logged into your GitHub account) can edit files and push changes — that's what keeps you as the sole "owner" of the content.

## Adding a certificate later

1. Open `admin-add-certificate.html` on your own computer (just double-click it, no internet needed)
2. Fill in certificate name, issuer, year, and link (optional)
3. Click **Generate Code**, then **Copy**
4. Go to your GitHub repo → open `certificates.js` → click the pencil (edit) icon
5. Paste the copied line inside the `window.CERTIFICATES = [ ... ]` array
6. Commit changes — your live site updates automatically for every visitor

## Adding your LinkedIn later

Open `index.html`, find this line near the Contact section:
```html
<!-- LinkedIn card: add once link is shared -->
```
Replace it with:
```html
<a class="contact-card" href="YOUR_LINKEDIN_URL" target="_blank">
  <span class="contact-label">LinkedIn</span>
  <span class="contact-value">View Profile</span>
</a>
```

## Want an actual .com domain later?

`.com` domains are never free (~₹700–900/year from Namecheap or GoDaddy), but once you buy one,
you can point it to your free GitHub Pages site at no extra hosting cost — just add a `CNAME` file
in the repo with your domain name. Ask me when you're ready and I'll walk you through it.
