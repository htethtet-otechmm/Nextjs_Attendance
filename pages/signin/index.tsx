'use client'; 

import React, { useState } from 'react'; 
import styles from './signinPage.module.scss';
import { useRouter } from 'next/navigation'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const router = useRouter(); 

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); 

    if (email === 'admin@example.com' && password === 'password123') {
      alert('Login successful!');
      setError('');
      router.push('/checkin-out');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Log In</h1>
      <div className={styles.loginCard}>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              placeholder="password123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <p className={styles.errorText}>{error}</p>}

          <button type="submit" className={styles.signInButton}>
            Sign In
          </button>
        </form>

        <a href="#" className={styles.forgotPasswordLink}>
          Forgot password?
        </a>
      </div>
    </div>
  );
};

export default LoginPage;