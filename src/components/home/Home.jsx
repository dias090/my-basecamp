import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import './home.css'

import ShowProjects from "../showProjects/showProjects";
import Navbar from "../navbar/Navbar";

const Home = () =>{
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State for error handling
    const navigate = useNavigate();
    const user = authUser;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthUser(user);
            setLoading(false);
        });
    }, []);
    return (
        <div className="home_container">
            <Navbar/>
            <h1 className="center underline">Projects</h1>
            {error && <p className="error">{error}</p>}
            <ShowProjects userId={authUser?.uid} />
        </div>
    );
}

export default Home;
