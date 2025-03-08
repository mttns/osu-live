import { Score } from "osu-live";
import styles from "./ScoreCard.module.css";
import Image from "next/image";
import { memo, useState } from "react";
import { HeartIcon } from "../icons/HeartIcon";
import { ScoreTime } from "./ScoreTime";
import { ClockIcon } from "../icons/ClockIcon";

export const ScoreCard = memo(function ScoreCard({ score }: { score: Score }) {
  const [coverSrc, setCoverSrc] = useState(
    score.beatmap
      ? `https://assets.ppy.sh/beatmaps/${score.beatmap?.beatmapset_id}/covers/raw.jpg`
      : `https://osu.ppy.sh/assets/images/default-bg.7594e945.png`
  );

  return (
    <div className={styles["score"]}>
      <Image
        className={styles["score-bg"]}
        alt={"bg"}
        src={coverSrc}
        width={256}
        height={60}
        onError={() => {
          setCoverSrc(
            `https://osu.ppy.sh/assets/images/default-bg.7594e945.png`
          );
        }}
        style={{ width: 256, height: 60 }}
      ></Image>
      <div className={styles["score-content"]}>
        <Image
          height={44}
          width={44}
          className={styles["profile-picture"]}
          alt={`Profile picture for ${
            score.user.username || `User #${score.user.id}`
          }`}
          src={`https://a.ppy.sh/${score.user.id}`}
          style={{ width: "44px", height: "44px" }}
          fill={false}
        ></Image>
        <div className={styles["score-data"]}>
          <p className={styles["score-heading"]}>
            <a
              href={`https://osu.ppy.sh/users/${score.user.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles["user"]}
            >
              {score.user.username ?? `Unindexed User (${score.user.id})`} mode:{" "}
              {score.rulesetId === 0
                ? "std"
                : score.rulesetId === 1
                ? "taiko"
                : score.rulesetId === 2
                ? "fruits"
                : "mania"}
            </a>
          </p>
          <p className={styles["score-subheading"]}>
            {score.beatmap?.ranked === 4 ? (
              <HeartIcon className={styles["loved"]} />
            ) : (
              <span className={styles["pp"]}>
                {Math.round(score.pp || 0)}pp
              </span>
            )}
            <span className={styles["mods"]}>
              {score.mods.length > 0
                ? `+${score.mods.map((m) => m.acronym).join("")}`
                : ""}
            </span>
            <span className={styles["elapsed"]}>
              <ClockIcon className={styles["clock-icon"]} />
              <ScoreTime endedAt={score.ended_at} />
            </span>
          </p>
        </div>

        <div className={styles["beatmap-data"]}>
          <div className={styles["beatmap-name-container"]}>
            <p className={styles["beatmap-name"]}>
              <a
                className={styles["beatmap-link"]}
                href={`https://osu.ppy.sh/b/${score.beatmap_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {score.beatmap
                  ? `${score.beatmap.beatmapset.artist} - ${score.beatmap.beatmapset.title}`
                  : `Beatmap #${score.beatmap_id}`}
              </a>
            </p>
            {
              <p className={styles["beatmap-version"]}>
                {score.beatmap
                  ? `[${score.beatmap.version}]`
                  : `Unindexed Beatmap`}
              </p>
            }
          </div>
        </div>
        <div className={styles["bg-placeholder"]} />
      </div>
      <div
        className={styles["score-bg-gradient"]}
        onClick={() =>
          window.open(
            `https://osu.ppy.sh/scores/${score.id}`,
            "_blank",
            "noopener,noreferrer"
          )
        }
      />
    </div>
  );
});

/*

<a
            href={`https://osu.ppy.sh/b/${score.beatmap_id}`}
            className={styles["beatmap"]}
          >
            {score.beatmap
              ? `${score.beatmap.beatmapset.artist} - ${score.beatmap.beatmapset.title} [${score.beatmap.version}]`
              : `Beatmap ${score.beatmap_id}`}{" "}
            {score.mods.length > 0
              ? `+${score.mods.map((m) => m.acronym).join("")}`
              : ""}{" "}
          </a>{" "}

*/
