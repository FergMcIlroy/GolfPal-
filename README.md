# Ireland Golf Courses

A community-rated directory of golf courses across the island of Ireland — browse by
county, post reviews with photos, follow other golfers, and see the Top 25 leaderboard.

## What's in this folder

- `index.html` — the page shell. Loads React, Babel, and a small storage shim.
- `app.jsx` — the whole app (courses, reviews, friends, leaderboard, login).
- No build step, no `npm install` — it's plain files a static host can serve directly.

## ⚠️ Important: data is per-browser, not shared between people

This version stores everything in the browser's `localStorage` (see the shim at the
top of `index.html`). That means:

- Your reviews, login, and friends list stay on **your** device only.
- Someone else opening the same URL on their phone won't see your reviews, and you
  won't see theirs.

This is the tradeoff for "no server required." If you want reviews to be genuinely
shared across everyone who visits (like the original version), the fix is to swap
the `window.storage` shim for calls to a real backend — Firebase and Supabase both
have generous free tiers and work well for something this size. Happy to help wire
that up if you want to go that route later.

## Put it on GitHub

1. **Create a repository.**
   Go to [github.com/new](https://github.com/new), name it (e.g. `golf-courses`),
   keep it Public, and click **Create repository**. Don't add a README there —
   you already have one.

2. **Upload the files.**
   Easiest way without using git on the command line:
   - On your new repo's page, click **Add file → Upload files**.
   - Drag in `index.html`, `app.jsx`, and `README.md` from this folder.
   - Click **Commit changes**.

   (If you're comfortable with git instead: `git init`, `git add .`,
   `git commit -m "Initial commit"`, then `git remote add origin <your-repo-url>`
   and `git push -u origin main`.)

3. **Turn on GitHub Pages.**
   - In your repo, go to **Settings → Pages**.
   - Under "Build and deployment", set **Source** to **Deploy from a branch**.
   - Set **Branch** to `main` and folder to `/ (root)`, then **Save**.

4. **Wait ~1 minute, then visit your app.**
   GitHub will show the URL at the top of the Pages settings once it's live —
   it'll look like:
   `https://<your-username>.github.io/<repo-name>/`

That's it — no build pipeline, no server to manage.

## Updating it later

Edit `app.jsx` (or ask me to), then upload the changed file again through
**Add file → Upload files**, or `git push` if you're using git. GitHub Pages
redeploys automatically within a minute or so of any push to the `main` branch.
