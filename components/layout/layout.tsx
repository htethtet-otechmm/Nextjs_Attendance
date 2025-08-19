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
      <Header />
      <div className={styles.contentWrapper}>
        <Sidebar />
        <main style={{ flex: 1, padding: '1rem' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;