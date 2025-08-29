import { motion, AnimatePresence } from 'framer-motion';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import styles from '../../styles/Home.module.css';
import { usePathname } from 'next/navigation'; 

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  return (
    <div>
      <div className={styles.contentWrapper}>
        <Sidebar />
        <main className={styles.mainContent}>
          <Header />
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              transition={{ duration: 0.5 }} 
              style={{ height: '100vh' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Layout;