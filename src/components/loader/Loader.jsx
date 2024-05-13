import React from "react";
import './Loader.css'


const Loader = () =>{


    return (
        <div className="loader_container">
            <div className="hexagon" aria-label="Animated hexagonal ripples">
            	<div className="hexagon__group">
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            	</div>
            	<div className="hexagon__group">
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            	</div>
            	<div className="hexagon__group">
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            	</div>
            	<div className="hexagon__group">
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            	</div>
            	<div className="hexagon__group">
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            	</div>
            	<div className="hexagon__group">
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            		<div className="hexagon__sector"></div>
            	</div>
            </div>
            <p aria-label="Loading" className="loading_text">Loading...</p>
        </div>
    );
}

export default Loader;