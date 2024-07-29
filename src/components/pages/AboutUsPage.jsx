import React from "react";
import ImageWithTitleAboutUs from "../molecules/ImageWithTitleAboutUs";
import Text from "../atoms/Text/TextAboutUs";
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
          ¡Bienvenidos a nuestra página! Nos especializamos en crear arreglos florales únicos y duraderos que traen belleza y elegancia a cualquier espacio. Nuestras flores eternas son auténticas flores naturales que han sido tratadas con
           un proceso especial para mantener su frescura y belleza por mucho tiempo, sin necesidad de agua ni mantenimiento.
           Por otro lado, nuestras flores de listón son una opción creativa y versátil que combina colores vibrantes y diseño artístico.Nos apasiona el arte floral y creemos que cada arreglo debe contar una historia. Ya sea que busques un regalo especial para un ser querido, 
           decorar tu hogar un evento, o simplemente agregar un toque de naturaleza a tu día a día, estamos aquí para ayudarte a encontrar el arreglo perfecto. Nos enorgullece ofrecer productos de alta calidad y un servicio personalizado, asegurándonos de que cada cliente reciba una experiencia única y satisfactoria.
            </Text>
        </section>
    )
}

export default AboutUsSection