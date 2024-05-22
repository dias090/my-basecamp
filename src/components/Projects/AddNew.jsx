import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import M from 'materialize-css/dist/js/materialize.min.js';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import Loader from "../loader/Loader"
import '../home/home.css'
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import Navbar from "../navbar/Navbar";

const AddNew = ({ inputs, title }) => {
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
    });
    setTimeout(() => {
      const inputElems = document.querySelectorAll('input, textarea');
      M.updateTextFields(inputElems);
    }, 0);

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const handleInputChange = (e, inputName) => {
    if (formData === null) {
      setFormData({ [inputName]: e.target.value });
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [inputName]: e.target.value,
      }));
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const projectDocRef = await addDoc(collection(db, 'Projects'), {
          projectsAuthor: user?.uid,
          projectName: formData.projectName,
          projectDescription: formData.projectDescription,
          timeStamp: serverTimestamp()
        });
        console.log("Project added successfully with ID: ", projectDocRef.id);
        navigate("/");
      } catch (err) {
        console.error("Error adding project: ", err);
        M.toast({ html: 'Error adding project', classes: 'red' });
      }
    } else {
      console.log("User not authenticated");
    }
  };

  if(loading){
    return <Loader/>
  }

  return (
    <div>
      <div className="home_container">
        <Navbar/>
        <div className="row">
          <div className="col card s10 m8 l6 offset-s1 offset-m2 offset-l3 z-depth-1 white p-4" style={{marginTop: "100px"}}>
            <h3 style={{marginTop: "0px"}} className="center">{title}</h3>
            <form onSubmit={handleAdd}>
              {inputs.map((input) => (
                <div key={input.name} className="input-field">
                  {input.type === 'input' ? (
                    <>
                      <input
                        id={input.name}
                        type={input.type}
                        name={input.name}
                        placeholder={input.placeholder}
                        onChange={(e) => handleInputChange(e, input.name)}
                      />
                    </>
                  ) : (
                    <>
                      <textarea
                        id={input.name}
                        name={input.name}
                        placeholder={input.placeholder}
                        className="materialize-textarea"
                        onChange={(e) => handleInputChange(e, input.name)}
                      />
                    </>
                  )}
                </div>
              ))}
              <button type="submit" value="submit" className="btn black right mt-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNew;
