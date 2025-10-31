import React, { useState, useEffect } from "react";
import styles from "./header.module.scss";

const UserIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.33 4 18V20H20V18C20 15.33 14.67 14 12 14Z"
      fill="#333"
    />
  </svg>
);

const Header = () => {
  const [username, setUsername] = useState<string>("Guest");
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      try {
        const user = JSON.parse(storedUser);
        if (user && user.name) {
          setUsername(user.name);
        }
      } catch (e) {
        console.error("Failed to parse user in Header:", e);
        setUsername("Error");
      }
    }
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.adminView}>
        <button className={styles.adminButton}>
          <span className={styles.userName}>{username}</span>
        </button>

        <div className={styles.userInfo}>
          <div className={styles.userIcon}>
            <UserIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
