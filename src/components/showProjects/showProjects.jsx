import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ShowProjects = ({ userId }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (userId) {
      const q = query(collection(db, "Projects"), where("projectsAuthor", "==", userId));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let projects = [];
        querySnapshot.forEach((doc) => {
          projects.push({ ...doc.data(), id: doc.id });
        });
        setProjects(projects);
      });
      return () => unsubscribe();
    }
  }, [userId]);

  const handleDelete = async (projectId) => {
    try {
      await deleteDoc(doc(db, "Projects", projectId));
      console.log("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project: ", error);
    }
  };

  return (
    <div className="card_container">
      {projects.map((project) => (
        <div className="card blue-grey darken-4" key={project.id}>
          <div className="card-content white-text">
            <span className="card-title">{project.projectName}</span>
            <hr />
            <p>{project.projectDescription}</p>
          </div>
          <div className="card-action">
            <Link to={`/edit/${project.id}`}>Edit<i className="material-icons">edit</i></Link>
            <a href="/" onClick={() => handleDelete(project.id)}>Delete<i className="material-icons">delete</i></a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowProjects;

