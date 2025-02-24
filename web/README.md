# osu!live - web

This is, as you have probably guessed, the frontend of osu!live. Great care has been taken to eliminate unnecessary rerenders, so please consider using something like [React Scan](https://react-scan.com/) to verify that your changes aren't causing huge performance hits when contributing. (hint: uncomment the `<script>` tag in `layout.tsx`)

You can find a live example of this at https://osulive.mittens.cc.

## Development

Please open an issue for your idea first so we can make sure it's right for osu!live.

### Setting up your development environment

1. `pnpm install`
2. Open `.env.example`
3. Make sure `NEXT_PUBLIC_WEBSOCKET_URL` matches the URL of the backend
4. Rename `.env.example` to `.env`
5. `pnpm dev`. Happy hacking!

### Code style, linting, etc.

Just make sure it passes `pnpm lint`.
