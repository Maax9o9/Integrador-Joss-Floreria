import React from "react";
import Title from "../atoms/Title/TitleAboutUs";
import './ImageWithTitleAboutUs.css'


const ImageWithTitleAboutUs =({src, alt, title})=>{
    return(
        <div>
            <img src={src} alt={alt}></img>
            <Title>{title}</Title>
        </div>
    )
}

export default ImageWithTitleAboutUs