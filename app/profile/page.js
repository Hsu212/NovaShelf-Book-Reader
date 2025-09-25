'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image';
import styles from './page.module.css';

export default function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('/avatar.png');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        if (data) {
          setUsername(data.username || '');
          setAvatarUrl(data.avatar_url || '/avatar.png');
        }
      } catch (error) {
        console.error('Error fetching profile:', error.message);
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, [user]);

  const handleUpload = async (event) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true }); // upsert: true overwrites the file

      if (uploadError) throw uploadError;

      // Get the public URL of the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
      // Also update the profile table
      await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', user.id);

    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const updateProfile = async () => {
      try {
          setLoading(true);
          const { error } = await supabase.from('profiles').update({ username }).eq('id', user.id);
          if (error) throw error;
          alert('Profile updated successfully!');
      } catch(error) {
          alert(error.message);
      } finally {
          setLoading(false);
      }
  }

  return (
    <div>
      <h1 className="main-title">Edit Profile</h1>
      <div className={styles.profileContainer}>
        <div className={styles.avatarContainer}>
          <Image
            src={avatarUrl}
            alt="Profile Avatar"
            width={150}
            height={150}
            className={styles.avatar}
            key={avatarUrl} // Add key to force re-render on URL change
          />
          <label htmlFor="file-input" className={styles.uploadButton}>
            {uploading ? 'Uploading...' : 'Upload New Picture'}
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            style={{ display: 'none' }}
          />
        </div>
        <div className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" value={user?.email} disabled />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button onClick={updateProfile} className={styles.updateButton} disabled={loading}>
            {loading ? 'Saving...' : 'Update Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}