import React from 'react';
import { supabase } from '../lib/supabase'; 

const LoginPage = () => {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div>
      <h1>Please Log In</h1>
      <p>You need to be logged in to access this content.</p>
      <button onClick={handleLogin}>Log in with Google</button>
    </div>
  );
};

export default LoginPage;