import React, { useEffect } from 'react'
import './App.css';
import { RouterProvider } from 'react-router';
import { routes } from './app.routes';
import { useSelector } from 'react-redux';
import { useAuth } from '../features/auth/hook/useAuth';

import { use } from 'react';

const App = () => {
  const user = useSelector(state => state.auth.user);
   const { handleGetCurrentUser } = useAuth();

 useEffect(() => {
    if (user) return;
    handleGetCurrentUser();
  }, [user, handleGetCurrentUser]);


  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App