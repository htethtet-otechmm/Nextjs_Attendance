import React from 'react';
import styles from './sidebar.module.scss';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul>
          <li className={`${styles.navItem} ${styles.active}`}>
            <a href="/checkin-out">Check In/Out</a>
          </li>
          <li className={styles.navItem}>
            <a href="/leave-requests">Leave Requests</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;