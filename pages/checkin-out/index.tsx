'use client'; 

import React, { useState, useEffect } from 'react';
import styles from './checkin.module.scss';
import { MapPin } from "lucide-react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000); 

    return () => clearInterval(timerId);
  }, []); 

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

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

export default Clock;