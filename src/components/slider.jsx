import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Slider({ urls }) {
  return (
    <div className="mb-24">
      <Carousel showThumbs={false} autoPlay infiniteLoop showStatus={false}>
        {urls.map((url) => (
          <div>
            <img src={url} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
