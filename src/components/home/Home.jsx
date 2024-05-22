import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import './home.css'
import ShowProjects from "../showProjects/showProjects";
import Navbar from "../navbar/Navbar";
import Loader from "../loader/Loader"

const Home = () => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setLoading(false);
      } else {
        setError("User not authenticated");
        setLoading(false);
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="home_container">
      <Navbar />
      {loading ? (
        <Loader/>
      ) : (
        <>
          <h1 className="center underline">Projects</h1>
          {error && <p className="error">{error}</p>}
          {authUser && <ShowProjects userId={authUser.uid} />}
        </>
      )}
    </div>
  );
};

export default Home;
