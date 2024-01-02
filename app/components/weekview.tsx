// pages/week.js
import React from "react";
import styles from "./weekview.module.css";
const WeekView = () => {
  return (
    <div className={styles.container}>
      <h1>Week View</h1>
      <div className={styles.eventBox}></div>
      <div className={styles.movieBox}>
        <div className={styles.movieName}></div>
        <div className={styles.movieTime}></div>
      </div>
    </div>
  );
};

export default WeekView;
