"use client";
import React, { useState, useEffect } from "react";
import styles from "./vote.module.css";

// Import types from the db file
import { Movie, Event } from "@/app/db";

const Vote: React.FC = () => {
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

  const handleVote = (movieId: number) => {
    // Implement your logic to handle the vote for the selected movie
    console.log(`Voting for movie with ID ${movieId}`);
  };

  const handlePreferredTime = (eventId: number, time: string) => {
    // Implement your logic to handle the preferred time for the selected event
    console.log(`Setting preferred time ${time} for event with ID ${eventId}`);
  };

  return (
    <div className={styles.container}>
      <h1>Vote</h1>
      <div className={styles.content}>
        <div className={styles.eventBox}>
          {/* Display event information */}
          {weekData.events.map((event) => (
            <div key={event.event_id}>
              <p>Event Name: {event.event_name || "No Name"}</p>
              <p>Description: {event.description || "No Description"}</p>
              {/* Preferred Time Input */}
              <input
                type="text"
                placeholder="Preferred Time"
                onChange={(e) =>
                  handlePreferredTime(event.event_id, e.target.value)
                }
              />
            </div>
          ))}
        </div>
        <div className={styles.movieBox}>
          {/* Display movie information with Vote Button */}
          {weekData.movies.map((movie) => (
            <div key={movie.movie_id}>
              <p>{movie.movie_title}</p>
              {/* Vote Button */}
              <button onClick={() => handleVote(movie.movie_id)}>Vote</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vote;
