// src/pages/login.tsx
import React, { useEffect, useState } from 'react';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '@packages/firebase/firebaseAuth';
import { useNavigate } from 'react-router-dom';
import ImageActionBanner from '@components/ImageActionBanner';
import MainSearch from '@components/mainSearch';
import { Button, Title, Flex } from '@mantine/core';


export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // ✅ 3. Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        navigate('/', { state: { displayName: user.displayName } });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // ✅ 4. Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/', { state: { displayName: user.displayName } });
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please try again.');
    }
  };

  // ✅ 5. Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center text-lg">
        Loading...
      </div>
    );
  }

  return (

        <div>
          {/* MainSearch and ImageActionBanner remain full-width */}
          <MainSearch />
          <ImageActionBanner />
    
        
       
    
         
      
    <div>
        <Flex
    direction="column"
    align="center"
    justify="center"
    style={{ height: '50vh'}} 
    >
      {!user ? (
        <>
          <Title order={2} fw={700} mb="md" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Sign in to Continue
        </Title>
          <Button
            onClick={handleGoogleSignIn}
            color="#62BB45"
            size="md"
            radius="md"
          >
            Sign in with Google
          </Button>
        </>
      ) : (
        <>
         <Title order={2} fw={700} mb="md" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Welcome, {user.displayName}
          </Title>
          <Button
            onClick={handleGoogleSignIn}
            color="#62BB45"
            size="md"
            radius="md"
          >
            Logout
          </Button>
        </>
      )}
      </Flex>
    </div>
    </div>
  );
}