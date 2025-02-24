import styles from "./page.module.css";
import { ScoreFeed } from "@/components/scores/ScoreFeed";
import { FilterContextProvider } from "@/components/context/FilterContext";
import { WebSocketContextProvider } from "@/components/context/WebSocketContext";
import { Status } from "@/components/status/Status";
import { Filters } from "@/components/filters/Filters";
import { TwitterIcon } from "@/components/icons/TwitterIcon";
import { HeartIcon } from "@/components/icons/HeartIcon";
import TimerProvider from "@/components/context/TimerContext";
import { GitHubIcon } from "@/components/icons/GitHubIcon";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles["site-header"]}>
          <span className={styles["title"]}>
            <span className={styles["osu"]}>osu!</span>live
          </span>
          <span className={styles["addendum"]}>
            by{" "}
            <a
              href={"https://osu.ppy.sh/u/11147702"}
              className={styles["creator"]}
              target="_blank"
              rel="noopener noreferrer"
              title="follow me on osu!"
            >
              null
            </a>
          </span>
          <div className={styles["links"]}>
            <a
              href="https://twitter.com/96khz"
              target="_blank"
              rel="noopener noreferrer"
              title="follow me on twitter"
            >
              <TwitterIcon className={styles["support-link"]} />
            </a>
            <a
              href="https://ko-fi.com/lucamotion"
              target="_blank"
              rel="noopener noreferrer"
              title="support me <3"
            >
              <HeartIcon className={styles["support-link"]} />
            </a>
            <a
              href="https://github.com/mttns/osu-live"
              target="_blank"
              rel="noopener noreferrer"
              title="check out the source code"
            >
              <GitHubIcon className={styles["support-link"]} />
            </a>
          </div>
        </header>
        <div className={styles["scores-header"]}>
          <FilterContextProvider>
            <Filters />
            <WebSocketContextProvider>
              <Status />
              <TimerProvider>
                <ScoreFeed />
              </TimerProvider>
            </WebSocketContextProvider>
          </FilterContextProvider>
        </div>
      </main>
    </div>
  );
}
