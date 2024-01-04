"use client";
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import styles from "./vote.module.css";
import { Movie, Event } from "@/app/db";

interface VoteProps {
  week: number;
  session: any;
}
interface VotingMovie {
  userCanVote: boolean;
  voteData: any;
}
interface VotingEvent {
  userCanVote: boolean;
  voteData: any;
}

const Vote = ({ week, session }: VoteProps) => {
  const [MovieInfo, setMovieInfo] = useState<VotingMovie>({
    userCanVote: false,
    voteData: null,
  });
  const [EventInfo, setEventInfo] = useState<VotingEvent>({
    userCanVote: false,
    voteData: null,
  });

  useEffect(() => {
    async function getData() {
      const useremail = session?.user?.email as string;

      const responseCanVoteMovie = await fetch(
        `/api/get/canvoteevent?week=${week}&email=${useremail}`
      );
      const canVoteMovie = await responseCanVoteMovie.json();
      setMovieInfo(canVoteMovie);

      const responseCanVoteEvent = await fetch(
        `/api/get/canvotemovie?week=${week}&email=${useremail}`
      );
      const canVoteEvent = await responseCanVoteEvent.json();
    }
    getData();
  }, [week, session]);

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

  return (
    <div className={styles.container}>
      <Typography variant="h4">Vote</Typography>
      <Box className={styles.content}>
        <Box>
          {MovieInfo.userCanVote ? (
            <Box>
              <Typography variant="body1">
                User cannot vote for Movies
              </Typography>
              {/* Add your box content here for true condition */}
            </Box>
          ) : (
            <Box>
              <Typography variant="body1">User can vote for Movies</Typography>
              {/* Add your box content here for true condition */}
            </Box>
          )}
        </Box>
        <Box>
          {EventInfo.userCanVote ? (
            <Box>
              <Typography variant="body1">
                User cannot vote for Events
              </Typography>
              {/* Add your box content here for true condition */}
            </Box>
          ) : (
            <Box>
              <Typography variant="body1">User can vote for Events</Typography>
              {/* Add your box content here for true condition */}
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Vote;
