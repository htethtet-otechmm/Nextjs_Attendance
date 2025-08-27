import React from 'react';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import styles from '../../styles/Home.module.css';

type LayoutProps = {
  children: React.ReactNode; 
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div> 
      <div className={styles.contentWrapper}>
        <Sidebar />
        <main className={styles.mainContent}>
        <Header />
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;