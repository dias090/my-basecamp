import React from "react";
import "./Form.css"
import BasecampGroupIcon from "../../assets/group-svgrepo-com.svg"
const Form = () => {
    return (
        <div>
            <div className="container_main">
                <div className="container">
                    <div className="row">
                        <div className="col m4 offset-m4 s2 offset-s5 selectDisable">
                            <img src={BasecampGroupIcon} alt="" className="main_icon selectDisable" />
                            <h1 className="main_text">
                                Collaborate
                            </h1>
                        </div>
                        <div className="col m6 offset-m3 center">
                            <p>
                                A project management tool for developers
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m6 offset-m3 center btn-con">
                            <a href="/login" className="button hoverable  z-depth-3">Login</a>
                            <a href="/signup" className="button hoverable z-depth-3">Signup</a>
                        </div>
                    </div>
                    <br/><br/>
                </div>
            </div>
        </div>
    )
}

export default Form;