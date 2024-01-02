import React, { useState } from "react";

import styles from "./page.module.css";
import CreateEvent from "./event";
import CreateMovie from "./movie";
import UsersComponent from "./user";

const ManagementPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.usersContainer}>
        <UsersComponent />
      </div>
      <div className={styles.moviesAndEventsContainer}>
        <CreateMovie />
        <CreateEvent />
      </div>
    </div>
  );
};

export default ManagementPage;
