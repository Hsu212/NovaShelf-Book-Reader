'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import styles from './page.module.css';
import { FaUser, FaLock, FaEnvelope, FaGoogle } from 'react-icons/fa';

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // ADD THIS FUNCTION BACK
  const toggleView = () => setIsLoginView(!isLoginView);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.target);
    const { email, password, name } = Object.fromEntries(formData.entries());

    try {
      if (isLoginView) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = "/";
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { username: name } },
        });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>&larr; Back to Home</Link>

      <div className={styles.authCard}>
        <h1 className={styles.title}>
          {isLoginView ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className={styles.subtitle}>
          {isLoginView ? 'Sign in to continue' : 'Get started with NovaShelf'}
        </p>

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLoginView && (
            <div className={styles.inputGroup}>
              <FaUser className={styles.inputIcon} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className={styles.inputField}
                required
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <FaEnvelope className={styles.inputIcon} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className={styles.inputField}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <FaLock className={styles.inputIcon} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.inputField}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className={styles.divider}>or</div>

        <button className={styles.socialButton}>
          <FaGoogle />
          Sign In with Google
        </button>

        <p className={styles.toggleText}>
          {isLoginView ? "Don't have an account?" : 'Already have an account?'}
          <span onClick={toggleView} className={styles.toggleLink}>
            {isLoginView ? ' Sign Up' : ' Sign In'}
          </span>
        </p>
      </div>
    </div>
  );
}
