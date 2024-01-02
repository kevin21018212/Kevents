import styles from "./user.module.css";
import { db, Users } from "../db"; // Adjust the path

const UsersComponent = async () => {
  let users = await db.select().from(Users);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.info}>
          <h2 className={styles.title}>All Users</h2>
          <p className={styles.subtitle}>Total Users: {users.length}</p>
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.userList}>
        {users.map((user) => (
          <div key={user.user_id} className={styles.userItem}>
            <div className={styles.userInfo}>
              <p className={styles.username}>{user.username}</p>
              <p className={styles.userDetails}>{user.google_account_id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersComponent;
