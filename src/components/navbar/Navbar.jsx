import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import { deleteDoc, doc, collection, getDocs, getDoc, query, where } from "firebase/firestore";

import AdminIcon from "../../assets/admin_icon";

const Navbar = () => {
    const [authUser, setAuthUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const user = authUser;
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setAuthUser(user);
        setLoading(false);
        if (user) {
          const userDocRef = doc(db, 'Users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          setIsAdmin(userDocSnap.data().Admin || false);
        }
      });
  
      const dropdownElems = document.querySelectorAll('.dropdown-trigger');
      const dropdownInstances = M.Dropdown.init(dropdownElems);
  
      if (document.readyState === 'complete') {
        const elems = document.querySelectorAll('.sidenav');
        const instances = M.Sidenav.init(elems);
  
        return () => {
          unsubscribe();
          dropdownInstances.forEach(instance => {
            instance.destroy();
          });
          instances.forEach(instance => {
            instance.destroy();
          });
        };
      }
    }, []);
      

    const handleSignOut = () => {
        signOut(auth)
          .then(() => {
            console.log("Signed out successfully");
          })
          .catch((err) => {
            console.error("Error signing out:", err);
            setError("Error signing out. Please try again later.");
          });
    };

    const handleDeleteUser = async () => {
        if (!authUser) {
          console.error("User object is invalid or null.");
          setError("User object is invalid or null. Please try again later.");
          return;
        }
      
        try {
          await deleteUser(authUser);
          const projectsCollectionRef = collection(db, 'Projects');
          const projectsQuery = query(projectsCollectionRef, where('projectsAuthor', '==', authUser.uid));
          const projectsSnapshot = await getDocs(projectsQuery);
          const projectDeletePromises = projectsSnapshot.docs.map(projectDoc => deleteDoc(projectDoc.ref));
          await Promise.all(projectDeletePromises);
          const userDocRef = doc(db, 'Users', authUser.uid);
          await deleteDoc(userDocRef);
      
          console.log("User deleted successfully");
          navigate("/form");
        } catch (error) {
          console.error("Error deleting user:", error);
          setError("Error deleting user. Please try again later.");
        }
      };
    return (
      <div>
      <nav className="blue-grey darken-4">
        <div className="nav-wrapper container">
          <a href="/" className="brand-logo">Welcome {authUser?.displayName}{isAdmin && (<AdminIcon/>)}</a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons right">menu</i></a>
          <ul className="right hide-on-med-and-down">
            {isAdmin && (<li><a href="/viewusers"><i className="material-icons right">list_alt</i>All Users</a></li>)}
            <li><a href="/add"><i className="material-icons right">add</i>Add project</a></li>
            <li><a onClick={handleSignOut}><i className="material-icons right">logout</i>Logout</a></li>
            <li><a onClick={handleDeleteUser}><i className="material-icons right">delete</i>Delete Account</a></li>
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        {isAdmin && (<li><a href="/viewusers"><i className="material-icons right">list_alt</i>All Users</a></li>)}
        <li><a href="/add"><i className="material-icons right">add</i>Add project</a></li>
        <li><a onClick={handleSignOut}><i className="material-icons right">logout</i>Logout</a></li>
        <li><a onClick={handleDeleteUser}><i className="material-icons right">delete</i>Delete Account</a></li>
      </ul>
      <br />
    </div>
    )
}

export default Navbar;