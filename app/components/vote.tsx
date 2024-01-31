"use client";
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import styles from "./vote.module.css";
import { Movie, Event } from "@/app/db";
import { Button } from "@mui/material";

interface VoteProps {
  week: number;
  session: any;
}
interface VotingMovie {
  userCanVote: boolean;
  movies: Movie[];
}
interface VotingEvent {
  userCanVote: boolean;
  weekEvents: Event[];
}

const Vote = ({ week, session }: VoteProps) => {
  const [MovieInfo, setMovieInfo] = useState<VotingMovie>({
    userCanVote: false,
    movies: [],
  });

  // State for eventInfo
  const [EventInfo, setEventInfo] = useState<VotingEvent>({
    userCanVote: false,
    weekEvents: [],
  });

  useEffect(() => {
    async function getData() {
      if (session) {
        const useremail = session?.user?.email as string;

        const responseCanVoteMovie = await fetch(
          `/api/get/canvotemovie?week=${week}&email=${useremail}`
        );
        const canVoteMovie = await responseCanVoteMovie.json();
        setMovieInfo(await canVoteMovie);

        const responseCanVoteEvent = await fetch(
          `/api/get/canvoteevent?week=${week}&email=${useremail}`
        );
        const canVoteEvent = await responseCanVoteEvent.json();
        setEventInfo(await canVoteEvent);
      }
    }
    getData();
  }, [session]);

  const handleVote = async (movieId: number) => {
    const useremail = session?.user?.email as string;
    await fetch(
      `/api/add/votemovie?week=${week}&email=${useremail}&movie_id=${movieId}`
    );

    console.log(`Voted successfully for movie with ID ${movieId}`);
  };

  const handlePreferredTime = (eventId: number, time: string) => {
    // Implement your logic to handle the preferred time for the selected event
    console.log(`Setting preferred time ${time} for event with ID ${eventId}`);
  };

  console.log(EventInfo);

  return (
    <div className={styles.container}>
      <Box className={styles.eventContainer}>
        {EventInfo.weekEvents?.map((event) => (
          <Container className={styles.event} key={event.event_id}>
            <Typography variant="body1">
              Event Name: {event.event_name || "No Name"}
            </Typography>
            <Typography variant="body1">
              Description: {event.description || "No Description"}
            </Typography>
          </Container>
        ))}
      </Box>
      <Box className={styles.movieContainer}>
        <Box>
          {!MovieInfo.userCanVote ? (
            <Box
              className={styles.movie}
              style={{
                backgroundImage: `url(${MovieInfo.movies[0]?.url})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></Box>
          ) : (
            <Box className={styles.movieBox}>
              {MovieInfo.movies?.map((movie: any, index: number) => (
                <Box
                  className={styles.movieVote}
                  key={movie.movie_id}
                  style={{
                    backgroundImage: `url(${MovieInfo.movies[index]?.url})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <Button
                    color="primary"
                    size="small"
                    onClick={() => handleVote(movie.movie_id)}
                    sx={{ margin: " 2.5% 20%" }}
                  >
                    Vote
                  </Button>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Vote;
