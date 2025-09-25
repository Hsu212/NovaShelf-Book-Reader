// In app/components/UserProfile/UserProfile.js
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './UserProfile.module.css';
import { useAuth } from '@/app/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';

export default function UserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .single();

      if (error) {
        console.warn(error.message);
      } else if (data) {
        setProfile(data);
      }
    };
    getProfile();
  }, [user]);

  if (!user) {
    return null;
  }

  const userName = profile?.username || user.email.split('@')[0];
  const userEmail = user.email;
  const avatarUrl = profile?.avatar_url || '/avatar.png'; // Use fetched URL or fallback

  return (
    <div className={styles.profileContainer}>
      <Image
        src={avatarUrl}
        alt="User Avatar"
        width={60}
        height={60}
        className={styles.avatar}
        key={avatarUrl} // Force re-render on change
      />
      <div className={styles.userInfo}>
        <p className={styles.userName}>{userName}</p>
        <p className={styles.userEmail}>{userEmail}</p>
      </div>
    </div>
  );
}