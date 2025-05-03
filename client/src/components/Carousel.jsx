import { Carousel } from "@material-tailwind/react";
import image1 from "../images/carrousel 1.png"
 
export function CarouselDefault() {
  return (
    <Carousel className="rounded-xl">
      <img
        src={image1}
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src={image1}
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