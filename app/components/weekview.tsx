"use client";
import React, { useState, useEffect } from "react";
import styles from "./weekview.module.css";

// Import types from the db file
import { Movie, Event } from "@/app/db";

const WeekView: React.FC = () => {
  const [weekData, setWeekData] = useState<{
    events: Event[];
    movies: Movie[];
  }>({ events: [], movies: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/get/week?week=2`);
        const data = await response.json();
        setWeekData(data);
      } catch (error) {
        console.error("Error fetching week data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Week View</h1>
      <div className={styles.content}>
        <div className={styles.eventBox}>
          {/* Display event information */}
          {weekData.events.map((event) => (
            <div key={event.event_id}>
              <p>Event Name: {event.event_name || "No Name"}</p>
              <p>Description: {event.description || "No Description"}</p>
            </div>
          ))}
        </div>
        <div className={styles.movieBox}>
          {weekData.movies.map((movie) => (
            <div key={movie.movie_id}>
              <p>{movie.movie_title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
