import React from 'react';
import styles from './sidebar.module.scss';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul>
          <li className={`${styles.navItem} ${styles.active}`}>
            <Link href={"/checkin-out"}>Check In/Out</Link>
          </li>
          <li className={styles.navItem}>
          <Link href={"/leave-requests"}>Leave Requests</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;