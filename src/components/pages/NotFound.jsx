import React from "react";
import "./NotFound.css"; 

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="background-blur"></div>
            <div className="content">
                <div className="error404">
                    <h1>404</h1>
                </div>
                <div className="errorText">
                    <p>Lo sentimos! Esta página no fue encontrada</p>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
