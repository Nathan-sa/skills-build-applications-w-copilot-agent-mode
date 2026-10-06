# OctoFit Tracker frontend

The presentation tier uses React 19, Vite, React Router, and Bootstrap.

## Run locally

Install dependencies and start the frontend from the repository root:

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```

When `VITE_CODESPACE_NAME` is unset, the app uses `http://localhost:8000` for
the API. In GitHub Codespaces, define `VITE_CODESPACE_NAME` in
`octofit-tracker/frontend/.env.local` using the Codespace name, for example:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then requests the API at
`https://your-codespace-name-8000.app.github.dev`. Restart the Vite server
after changing `.env.local`.
