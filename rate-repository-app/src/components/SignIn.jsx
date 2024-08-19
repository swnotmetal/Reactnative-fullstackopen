import React, { useState } from 'react';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn.jsx';
import Notification from './Notification.jsx';
import { SignInContainer } from './SignInContainer'; 

const SignIn = () => {
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const handleSubmit = async (values) => {
    try {
      const response = await signIn(values);

      if (response?.authenticate?.accessToken) {
        setNotification({ message: 'Login successful!', type: 'success' });
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setNotification({ message: 'Login failed. Please try again.', type: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'Error occurred while signing in.', type: 'error' });
    }
  };

  return (
    <>
      {notification.message && <Notification message={notification.message} type={notification.type} />}
      <SignInContainer onSubmit={handleSubmit} />
    </>
  );
};

export default SignIn;
