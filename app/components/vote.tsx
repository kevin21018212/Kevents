"use client";
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./vote.module.css";
import { Movie, Event } from "@/app/db";

interface VoteProps {
  week: number;
  session: any;
}
interface WeekData {
  events: Event[];
  movies: Movie[];
}

const Vote = ({ week, session }: VoteProps) => {
  const [weekData, setWeekData] = useState<WeekData>({
    events: [],
    movies: [],
  });

  const [userCanVote, setUserCanVote] = useState<boolean | null>(null);

  useEffect(() => {
    async function getData() {
      const useremail = session?.user?.email as string;
      const responseWeek = await fetch(`/api/get/week?week=${week}`);
      const dataWeek = await responseWeek.json();
      setWeekData(dataWeek);
      const responseCanVote = await fetch(
        `/api/get/canvote?week=${week}&email=${useremail}`
      );
      const dataCanVote = await responseCanVote.json();
      setUserCanVote(dataCanVote.userCanVote);
    }
    getData();
  }, [week, session]);

  const handleVote = async (movieId: number) => {
    const useremail = session?.user?.email as string;
    await fetch(
      `/api/add/votemovie?week=${week}&email=${useremail}&movie_id=${movieId}`
    );

    setUserCanVote(false);
    console.log(`Voted successfully for movie with ID ${movieId}`);
  };

  const handlePreferredTime = (eventId: number, time: string) => {
    // Implement your logic to handle the preferred time for the selected event
    console.log(`Setting preferred time ${time} for event with ID ${eventId}`);
  };

  return (
    <div className={styles.container}>
      <Typography variant="h4">Vote</Typography>
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
              {/* Preferred Time Input */}
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Preferred Time"
                onChange={(e) =>
                  handlePreferredTime(event.event_id, e.target.value)
                }
              />
            </Box>
          ))}
        </Box>
        <Box className={styles.movieBox}>
          {/* Display movie information with Vote Button (conditionally) */}
          {weekData.movies.map((movie) => (
            <Box key={movie.movie_id}>
              <Typography variant="body1">{movie.movie_title}</Typography>
              {/* Conditionally render the Vote Button based on user voting eligibility */}
              {userCanVote !== null && userCanVote && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleVote(movie.movie_id)}
                >
                  Vote
                </Button>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Vote;
