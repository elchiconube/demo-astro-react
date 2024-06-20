import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Slider() {
  return (
    <div className="mb-24">
      <Carousel showThumbs={false} autoPlay infiniteLoop showStatus={false}>
        <div>
          <img src={"/slider/slider1.jpg"} />
        </div>
        <div>
          <img src={"/slider/slider2.jpg"} />
        </div>
        <div>
          <img src={"/slider/slider3.jpg"} />
        </div>
        <div>
          <img src={"/slider/slider4.jpg"} />
        </div>
      </Carousel>
    </div>
  );
}
