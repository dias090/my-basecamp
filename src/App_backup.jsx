import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import './loading.css'

import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './components/home/Home';
import Form from './components/form/Form';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Admin from './components/admin/Admin';
import Page404 from './components/404/404';

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const USER_TYPES = {
    PUBLIC:'Public User',
    NORMAL_USER:'Normal User',
    ADMIN_USER:'Admin User',
  }

  const CURRENT_USER_TYPE = USER_TYPES.ADMIN_USER


  if (loading) {
    return <div className='loaderContainer'><div className='loader'></div></div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Page404/>} />
        {authUser ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminElement><Admin /></AdminElement>} />
            <Route path="/form" element={<Navigate to="/" />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/form" />} />
            <Route path="/form" element={<Form />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </Router>
  );

  function AdminElement({children}) {
    if(CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER){
      return <>{children}</>
    }else {
      return <Navigate to="/" />;
    }
  }
}

export default App;
