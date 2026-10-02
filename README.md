# 🪵 TungWeb

A browser that lives in a web page: tabs, address bar, bookmarks, search, a built-in web proxy,
and TungPlayer (paste a YouTube link). Zero dependencies, Node 18+.

## Run locally
    npm start        # then open http://localhost:3000

## Run from GitHub
GitHub Pages only hosts static files, so it cannot run the proxy. Use one of these instead:
- **Codespaces:** Code → Codespaces → Create. In the terminal run `npm start`, then open the forwarded port 3000.
- **Render (free):** New → Web Service → connect this repo. It reads `render.yaml`; no settings needed.
- **Railway / Fly / any Node host:** start command `npm start`; it uses the `PORT` env var.

## Notes
- Requests to private/internal IPs are blocked. Don't remove this on a public server.
- Cookies are not forwarded, so logins don't work. Sites with heavy anti-bot checks (Google, Cloudflare-protected pages) may refuse.
- Anyone with your URL can use the proxy. Keep it personal, or add a password.
