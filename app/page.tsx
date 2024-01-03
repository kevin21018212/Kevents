"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./page.module.css";
import WeekView from "./components/weekview";
import Vote from "./components/vote";

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
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.textBox}>
            {!session ? (
              <div>
                <p>Please log in to access additional features.</p>
              </div>
            ) : (
              <div>
                <p>Hello, {session.user.name}!</p>
              </div>
            )}
          </div>
          <button className={styles.button} onClick={handleSignClick}>
            {session && session.user ? "Sign Out" : "Sign In"}
          </button>
        </div>
      </div>
      <WeekView />
      {!session ? <></> : <Vote />}
    </>
  );
};

export default Home;
