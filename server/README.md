# osu!live - server

This is the backend of osu!live. It's responsible for fetching and distributing scores, as well as retrieving and caching user and beatmap data from the osu! API.

You can find a live example of this at https://osulive.mittens.cc.

## How it works

Scores are fetched on a specified interval (`OSU_SCORES_POLL_INTERVAL`) from osu!'s `/scores` endpoint. The array of scores is then iterated over to obtain user and beatmap data from Redis. If the item is uncached, it is then added to a Redis sorted set (sorted by date added) for later fetching. Scores are then emitted to clients via websocket.

The user and beatmap fetchers run on a specified interval (`OSU_DATA_FETCH_INTERVAL`), and only if there are pending items in the sets. You may request up to 50 items at a time from the osu! API, so they are batched accordingly.

Please be a responsible user of the osu! API and don't set the intervals too low.

## Development

Please open an issue for your idea first so we can make sure it's right for osu!live.

**osu!live requires a Redis server.**

### Setting up your development environment

1. `pnpm install`
2. [Create an OAuth application on osu!](https://osu.ppy.sh/home/account/edit#oauth) and note the Client ID and Secret.
3. Open `.env.example`
4. Add your `OSU_CLIENT_ID` and `OSU_CLIENT_SECRET`.
5. Make sure `REDIS_URL` matches the URL of your Redis instance.
6. Rename `.env.example` to `.env`
7. `pnpm dev`. Happy hacking!

### Code style, linting, etc.

¯\\\_(ツ)\_/¯
