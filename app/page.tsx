import React from "react";
import styles from "./page.module.css";
import UsersComponent from "./management/user";
import CreateMovie from "./management/movie";
import CreateEvent from "./management/event";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Home Page</h1>
      <div>
        <p className={styles.userMessage}>Hello, </p>
        <UsersComponent />
        <CreateEvent />
      </div>
    </div>
  );
};

export default Home;
