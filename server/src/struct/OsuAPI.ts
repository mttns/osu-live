import { redis } from "../index.js";
import { WebAPIBeatmapsResponse } from "../schema/WebAPIBeatmapsResponse.js";
import { WebAPIScoresResponse } from "../schema/WebAPIScoresResponse.js";
import { WebAPITokenResponse } from "../schema/WebAPITokenResponse.js";
import { WebAPIUsersResponse } from "../schema/WebAPIUsersResponse.js";
import { TransformedAPIData } from "../types/index.js";

export class OsuAPI {
  public isApiHealthy: boolean | null = null;

  private readonly oauthUrl = "https://osu.ppy.sh/oauth/token";
  private readonly apiBaseUrl = "https://osu.ppy.sh/api/v2";
  private readonly client_id = process.env.OSU_CLIENT_ID;
  private readonly client_secret = process.env.OSU_CLIENT_SECRET;
  private bearer?: string;
  private bearer_expires?: Date;
  private scoreCursor?: number;

  private async request(
    url: string | URL,
    options?: RequestInit
  ): Promise<unknown> {
    if (
      this.bearer === undefined ||
      (this.bearer_expires &&
        this.bearer_expires.getTime() < Date.now() + 1000 * 60 * 30)
    ) {
      await this.login();
    }

    const response = await fetch(url, {
      ...options,
      headers: { ...options?.headers, Authorization: `Bearer ${this.bearer}` },
    });

    if (response.status !== 200) {
      this.isApiHealthy = false;
      throw new Error(
        `Failed to retrieve data from osu! api: ${
          response.status
        } ${await response.text()}`
      );
    } else {
      this.isApiHealthy = true;
      return await response.json();
    }
  }

  private makeParams(data: (string | number)[], key: string) {
    return new URLSearchParams(
      data.map((id) => [key, id.toString()] as [string, string])
    );
  }

  public async getScores() {
    const params = new URLSearchParams({ ruleset: "osu" });
    if (this.scoreCursor !== undefined) {
      params.set("cursor[id]", this.scoreCursor.toString());
    }

    let url = `${this.apiBaseUrl}/scores?${params}`;

    const response = await this.request(url);
    const parsedBody = WebAPIScoresResponse.parse(response);

    this.scoreCursor = parsedBody.cursor.id;

    let usernames: (string | null)[] = [];
    let beatmaps: (string | null)[] = [];

    if (parsedBody.scores.length > 0) {
      usernames = await redis.mget(
        parsedBody.scores.map((score) => `user:${score.user_id}`)
      );
      beatmaps = await redis.mget(
        parsedBody.scores.map((score) => `beatmap:${score.beatmap_id}`)
      );
    }

    const transformed: TransformedAPIData[] = parsedBody.scores.map(
      (score, index) => {
        const username = usernames[index];
        const beatmap = beatmaps[index];

        if (username === null) {
          redis.zadd(`user-queue`, "LT", Date.now(), score.user_id);
        }

        if (beatmap === null) {
          redis.zadd(`beatmap-queue`, "LT", Date.now(), score.beatmap_id);
        }

        return {
          beatmap_id: score.beatmap_id,
          ended_at: new Date(score.ended_at).getTime(),
          id: score.id,
          mods: score.mods,
          pp: score.pp,
          user: { id: score.user_id, username },
          beatmap: beatmap === null ? null : JSON.parse(beatmap),
        };
      }
    );

    console.log(`Retrieved ${transformed.length} scores.`);
    return transformed;
  }

  public async getUsers(userIds: (string | number)[]) {
    const params = this.makeParams(userIds, "ids[]");
    const url = `${this.apiBaseUrl}/users?${params}`;

    const response = await this.request(url);
    const users = WebAPIUsersResponse.parse(response);

    return users;
  }

  public async getBeatmaps(beatmapIds: (string | number)[]) {
    const params = this.makeParams(beatmapIds, "ids[]");
    const url = `${this.apiBaseUrl}/beatmaps?${params}`;

    const response = await this.request(url);
    const maps = WebAPIBeatmapsResponse.parse(response);

    return maps;
  }

  public async login() {
    if (!this.client_id || !this.client_secret) {
      throw new Error(`CLIENT_ID and CLIENT_SECRET are unset!`);
    }

    const response = await fetch(this.oauthUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: this.client_id.toString(),
        client_secret: this.client_secret,
        grant_type: "client_credentials",
        scope: "public",
      }),
    });

    try {
      const parsedResponse = WebAPITokenResponse.parse(await response.json());

      this.bearer = parsedResponse.access_token;
      this.bearer_expires = new Date(
        Date.now() + parsedResponse.expires_in * 1000
      );

      console.log(`Successfully logged into osu! Web API.`);
      this.isApiHealthy = true;
    } catch (e) {
      console.log(`Failed to retrieve bearer token from osu! api:`, e);
      this.isApiHealthy = false;
    }
  }

  constructor() {}
}
