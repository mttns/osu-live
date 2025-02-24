"use client";
import { useContext } from "react";
import styles from "./Status.module.css";
import { WebSocketContext } from "../context/WebSocketContext";
import { EyeIcon } from "../icons/EyeIcon";

export const Status = function Status() {
  const { ws, connections, healthy } = useContext(WebSocketContext);

  return (
    <div className={styles["scores-status"]}>
      <div className={styles["status"]}>
        <div
          className={`${styles["status-dot"]} ${
            ws?.readyState === WebSocket.CLOSED ||
            ws?.readyState === WebSocket.CLOSING
              ? styles["disconnected"]
              : healthy === true
              ? styles["connected"]
              : styles["connecting"]
          }`}
        />
        <span
          className={
            ws?.readyState === WebSocket.CLOSED ||
            ws?.readyState === WebSocket.CLOSING
              ? styles["disconnected"]
              : healthy === true
              ? styles["connected"]
              : styles["connecting"]
          }
        >
          {ws?.readyState === WebSocket.CLOSED ||
          ws?.readyState === WebSocket.CLOSING
            ? "disconnected"
            : healthy === true
            ? "connected"
            : "connecting..."}
        </span>
      </div>
      {ws?.readyState === WebSocket.OPEN && healthy ? (
        <span className={styles["viewers-container"]}>
          <EyeIcon className={styles["viewers-icon"]} />
          <span className={styles["viewer-count"]}>{connections}</span>{" "}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};
