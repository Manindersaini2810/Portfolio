# Maninder Singh — Portfolio

A React, Vite, Tailwind CSS, Express and MongoDB portfolio with a neon-green terminal theme. Project and certificate pages use the REST API when available and local fallback data when it is not.

## Requirements

- Node.js 18 or newer and npm
- MongoDB locally or a MongoDB Atlas connection string

## Local setup

1. Copy `.env.example` to `.env` and set `MONGODB_URI`. Set `CLIENT_URL` to `http://localhost:5173` for local development.
2. Install dependencies from the repository root:

   ```sh
   npm install
   ```

3. Seed the project and certificate collections:

   ```sh
   npm run seed
   ```

4. Start the Vite frontend and Express API together:

   ```sh
   npm run dev
   ```

   Open `http://localhost:5173`. The Vite development server proxies `/api` requests to the API on port `5000`.

Build the static frontend with `npm run build`. Start the API separately with `npm start`; it listens on `PORT` (default `5000`). `GET /api/health` reports API and database readiness.

## Tuning animations

Adjust the named values in `client/src/config/animation.js` to tune the typing pace and jitter, pauses between terminal lines and command output, cursor blink, intro duration, scramble reveal timing, and Matrix rain speed. Rain speed is in pixels per second; the other timing values are in milliseconds. Reduced-motion preferences disable animated typing, decoding, and falling text.

## Content and assets

- Add project covers to `client/public/images/projects/` and set the exact-case matching `image` path in `server/seed/seed.js` (for example, `/images/projects/my-project.png`). Project order is controlled by its `order` value.
- Add certificate scans and optional PDF copies to `client/public/images/certificates/`; set their image and `originalUrl` paths in the `certificates` array in `server/seed/seed.js`. Certificate records can also be added directly to MongoDB.
- After editing the seed arrays, run `npm run seed` to replace the project and certificate collections with the seed data.
- Put the latest resume at `client/public/resume/Maninder_Singh_Resume.pdf`. Navbar and home-page resume links use this path.
- The existing profile photo is copied to `client/public/images/hero/profile.png`. Replace it there to update the home-page portrait.
- Contact messages are validated, rate-limited, and stored in MongoDB. Configure all of `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `MAIL_TO` to enable optional email notifications; without those settings, notifications are skipped.

## Environment

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | Required MongoDB connection string |
| `PORT` | Express listening port (default `5000`) |
| `CLIENT_URL` | Allowed frontend origin(s), comma-separated |
| `TRUST_PROXY` | Set to `true` when the API runs behind a trusted reverse proxy |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO` | Optional contact-message email notification |
| `VITE_API_URL` | Optional API base URL for a separately hosted frontend and API |

## Deployment

### MongoDB Atlas

Create a database user and cluster, allow the application server to connect, and set its connection string as `MONGODB_URI` in the server's environment. Run `npm run seed` once against that database.

### Render API

Create a Node web service from the repository root. Use `npm install` as the build command and `npm start` as the start command. Set `MONGODB_URI`, `CLIENT_URL` to your deployed frontend origin, and `PORT` if required by the service. Set `TRUST_PROXY=true` when the service is behind Render's proxy so contact rate limiting uses the visitor IP. Add the optional SMTP variables only when email delivery is configured.

### Vercel or Netlify frontend

Deploy from the repository root using `npm run build` and `client/dist` as the output directory. Set `VITE_API_URL` to the public Render API origin before building. The supplied Vercel and Netlify configuration files route application paths to the SPA entry point.

For a frontend and API on different origins, set `CLIENT_URL` on Render to the exact Vercel or Netlify origin. Redeploy the frontend after changing `VITE_API_URL`.
