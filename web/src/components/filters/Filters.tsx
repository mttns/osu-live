"use client";
import { useContext, useEffect, useState } from "react";
import styles from "./Filters.module.css";
import { FilterContext } from "../context/FilterContext";
import { FilterMap } from "osu-live";

export function Filters() {
  const { filters: debouncedFilters, setFilters: setDebouncedFilters } =
    useContext(FilterContext);
  const [filters, setFilters] = useState<FilterMap>(debouncedFilters);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 250);

    return () => clearTimeout(handler);
  });

  return (
    <div className={styles["container"]}>
      <div className={styles["pp-container"]}>
        pp:
        <input
          className={`${styles["input"]} ${styles["pp"]}`}
          type="text"
          placeholder={"min"}
          onChange={(event) =>
            setFilters({
              ...filters,
              minPp:
                event.target.value === ""
                  ? undefined
                  : parseInt(event.target.value),
            })
          }
          defaultValue={filters.minPp}
        />
        <input
          className={`${styles["input"]} ${styles["pp"]}`}
          type="text"
          placeholder={"max"}
          onChange={(event) =>
            setFilters({
              ...filters,
              maxPp:
                event.target.value === ""
                  ? undefined
                  : parseInt(event.target.value),
            })
          }
          defaultValue={filters.maxPp}
        />
      </div>
      <div className={styles["pp-container"]}>
        mods:
        <input
          className={`${styles["input"]} ${styles[""]}`}
          type="text"
          placeholder={'HDDT/-HDDT/"HDDT"'}
          onChange={(event) =>
            setFilters({
              ...filters,
              modCombo:
                event.target.value === "" ? undefined : event.target.value,
            })
          }
          defaultValue={filters.modCombo}
        />
      </div>
      <input
        className={`${styles["input"]} ${styles["username"]}`}
        type="text"
        placeholder={"exact username/id filter"}
        onChange={(event) =>
          setFilters({
            ...filters,
            usernameFilter:
              event.target.value === "" ? undefined : event.target.value,
          })
        }
        defaultValue={filters.usernameFilter}
      />
      <input
        className={`${styles["input"]} ${styles["search"]}`}
        type="text"
        placeholder={"beatmap filter (also takes map/set id)"}
        onChange={(event) =>
          setFilters({
            ...filters,
            beatmapFilter:
              event.target.value === "" ? undefined : event.target.value,
          })
        }
        defaultValue={filters.beatmapFilter}
      />
    </div>
  );
}
