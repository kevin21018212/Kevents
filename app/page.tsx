import React from "react";

import styles from "./page.module.css";

import UsersComponent from "./management/user";
import CreateMovie from "./management/movie";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Home Page</h1>
      <div>
        <p className={styles.userMessage}>Hello, </p>
        <UsersComponent />
        <CreateMovie />
      </div>
    </div>
  );
};

export default Home;
