import { Carousel } from "@material-tailwind/react";
import image1 from "../images/carrousel 1.png";
import image2 from "../images/SorteoAnuncio.png";

export function CarouselDefault() {
  return (
    <Carousel 
      className="rounded-xl"
      autoplay={true}          // Habilita el desplazamiento automático
      autoplayDelay={5000}     // 5000ms = 5 segundos
      loop={true}              // Permite que el carrusel sea infinito
      transition={{ duration: 2 }}             
    >
      <img
        src={image1}
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src={image2}
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src={image1}
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}