'use client'; 

import React, { useState, useEffect, ReactElement } from 'react';
import dayjs from 'dayjs'; 
import styles from './checkin.module.scss';
import { Layout, MapPin } from "lucide-react";

const Clock = () => {
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(dayjs());
    }, 1000); 

    return () => clearInterval(timerId);
  }, []); 

  const formattedDate = time.format('dddd, MMMM D, YYYY');

  const formattedTime = time.format('hh:mm:ss A');

  return (
    <div className={styles.clockContainer}>
      <div className={styles.date}>{formattedDate}</div>
      <div className={styles.location}><MapPin className="w-6 h-6 text-red-500" /> R44x+66 Yangon, Myanmar (Burma)</div>
      <div className={styles.time}>{formattedTime}</div>
      <div className={styles.actions}>
        <button className={`${styles.button} ${styles.clockIn}`}>
          Clock In
        </button>
        <button className={`${styles.button} ${styles.clockOut}`}>
          Clock Out
        </button>
      </div>
    </div>
  );
};

// Clock.getLayout = function getLayout(page: ReactElement) {
//   return <Layout>{page}</Layout>;
// };

export default Clock;