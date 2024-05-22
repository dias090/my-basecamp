import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { collection, query, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import Navbar from "../navbar/Navbar";
import './Admin.css'
import Loader from "../loader/Loader";

const Admin = () => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setLoading(false);
      return () => {
        unsubscribe();
      };
    });
  }, [authUser]);

  useEffect(() => {
    const q = query(collection(db, "Users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setUsers(users);
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteUser = async (userDocId) => {
    try {
      await deleteDoc(doc(db, "Users", userDocId));
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  const handleToggleAdmin = async (user) => {
    try {
      await updateDoc(doc(db, "Users", user.id), {
        Admin: !user.Admin,
      });
      console.log(`User ${user.userName} is now an ${!user.Admin ? "" : "non-"}admin`);
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  if(loading) {
    return <Loader />
  }

  return (
    <div>
      <Navbar />
      <h1 className="center">
        All Users
      </h1>
      <div className="container">
        <table className="z-depth-2 centered highlight">
          <thead>
            <tr>
                <th>Id</th>
                <th>User name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>delete/remove admin</th>
            </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{user.Admin ? 'Yes' : 'No'}</td>
                    <td className="button_container">
                      <button onClick={() => handleDeleteUser(user.id)} className="btn red"><i className="material-icons">delete</i></button>
                      <button onClick={() => handleToggleAdmin(user)} className="btn blue">{user.Admin ? (<i className="material-icons">person_off</i>) : (<i className="material-icons">person</i>)}</button>
                    </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin;
