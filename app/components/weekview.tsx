"use client";
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./weekview.module.css";
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
      <Typography variant="h4">Week View</Typography>
      <Box className={styles.content}>
        <Box className={styles.eventBox}>
          {/* Display event information */}
          {weekData.events.map((event) => (
            <Box key={event.event_id}>
              <Typography variant="body1">
                Event Name: {event.event_name || "No Name"}
              </Typography>
              <Typography variant="body1">
                Description: {event.description || "No Description"}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box className={styles.movieBox}>
          {weekData.movies.map((movie) => (
            <Box
              key={movie.movie_id}
              className={styles.movie}
              style={{
                backgroundImage: `url(${movie.url})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default WeekView;
