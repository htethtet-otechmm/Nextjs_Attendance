"use client";

import React from 'react';
import styles from './sidebar.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul>
          <li className={`${styles.navItem} ${pathname === '/checkin-out' ? styles.active : ''}`}>
            <Link href={"/checkin-out"}>Check In/Out</Link>
          </li>
          <li className={`${styles.navItem} ${pathname === '/leave-requests' ? styles.active : ''}`}>
            <Link href={"/leave-requests"}>Leave Requests</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;