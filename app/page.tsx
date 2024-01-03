"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import styles from "./page.module.css";
import WeekView from "./components/weekview";
import Vote from "./components/vote";
import { Box, Typography, Button } from "@mui/material";

const Home = () => {
  const { data: session } = useSession() as { data: any };

  const handleSignClick = async () => {
    if (session && session.user) {
      await signOut({ redirect: false });
    } else {
      await signIn("google");
    }
  };

  return (
    <div className={styles.container}>
      <Box className={styles.box}>
        <Box className={styles.textBox}>
          {!session ? (
            <Typography variant="body1">
              Please log in to access additional features.
            </Typography>
          ) : (
            <Typography variant="body1">Hello, {session.user.name}!</Typography>
          )}
        </Box>
        <Button
          className={styles.button}
          onClick={handleSignClick}
          variant="contained"
          color="primary"
        >
          {session && session.user ? "Sign Out" : "Sign In"}
        </Button>
      </Box>
      <WeekView />
      {!session ? <></> : <Vote week={2} session={session} />}
    </div>
  );
};

export default Home;
