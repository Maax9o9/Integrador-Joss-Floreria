import React from "react";
import ImageWithTitleAboutUs from "../molecules/ImageWithTitleAboutUs";
import Text from "../atoms/TextAboutUs";
import imagen from "../../assets/images/imagen-AcercadeNosotros.jpg"
import './AboutUsSection.css'

const AboutUsSection=()=>{
    return(
        <section>
         <ImageWithTitleAboutUs
         src={imagen} 
         alt="Flores de la tienda" 
         title="¿Quiénes somos?"
         />
          <Text>
           Somos una floristería dedicada a ofrecerte la frescura y belleza de las flores en cada ocasión especial de tu vida.
           Desde bodas y cumpleaños hasta eventos corporativos y momentos de consuelo, estamos aquí para embellecer tus momentos 
           más importantes.
           Nuestra pasión por las flores se refleja en cada diseño que creamos.
           Trabajamos con una amplia variedad de flores frescas y de la más alta calidad, cuidadosamente seleccionadas para garantizar
           que cada arreglo sea una obra de arte floral única y memorable.
            </Text>
        </section>
    )
}

export default AboutUsSection