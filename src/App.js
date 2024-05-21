import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { Navigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

import Home from './components/home/Home';
import Form from './components/form/Form';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Admin from './components/admin/Admin';
import Page404 from './components/404/404';
import Loader from './components/loader/Loader';
import AddNew from './components/Projects/AddNew';
import EditProject from './components/Projects/Edit';

const inputs = [
  { name: 'projectName', placeholder: 'Enter project name', type: 'text' },
  { name: 'projectDescription', placeholder: 'Enter description', type: 'textarea' },
];

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthUser(user);
      if (user) {
        const userDocRef = doc(db, 'Users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        setIsAdmin(userDocSnap.data().Admin || false);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="*" element={<Page404 />} />
      <Route path="/" element={authUser ? <Home /> : <Form />} />

      <Route path="/login" element={authUser ? <Navigate to={'/'}/> : <Login />} />
      <Route path="/signup" element={authUser ? <Navigate to={'/'}/> : <Signup />} />
      <Route path="/form" element={authUser ? <Navigate to={'/'}/> : <Form />} />

      <Route path="/add" element={authUser ? <AddNew title="Project" inputs={inputs} />: <Navigate to={'/'}/>}/>
      <Route path="/edit/:projectId" element={authUser ? <EditProject /> : <Navigate to={'/'}/>} />
      <Route path="/viewusers" element={isAdmin ? <Admin /> : <Navigate to={'/'}/>} />
    </Routes>
  );
  
}

export default App;
