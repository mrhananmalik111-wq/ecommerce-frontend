import { Container, Card } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

import { FaStar } from "react-icons/fa";

import "../css/CustomerReviews.css";

const reviews = [
  {
    name: "Ali Raza",
    city: "Lahore",
    image: "https://cdn.pixabay.com/photo/2022/06/23/05/26/smart-boy-picture-7279162_1280.jpg",
    review:
      "Amazing quality! Hoodie ka fabric bohat premium hai aur delivery bhi time par hui.",
  },
  {
    name: "Ayesha Khan",
    city: "Karachi",
    image: "https://tse3.mm.bing.net/th/id/OIP._WpZrTRrHruAPnfJA6d3sAHaHa?r=0&pid=Api&h=220&P=0",
    review:
      "First time order kiya tha. Size perfect tha aur stitching outstanding thi.",
  },
  {
    name: "Muhammad Hamza",
    city: "Islamabad",
    image: "https://i.pinimg.com/originals/28/96/13/289613a56b2c426a8dc25637f4fa2b9e.jpg",
    review:
      "Packaging aur quality dono zabardast thi. Definitely dobara shopping karunga.",
  },
  {
    name: "Fatima Noor",
    city: "Faisalabad",
    image: "https://tse2.mm.bing.net/th/id/OIP.-3EnMNdN27gFU7Soo8A12gHaEC?r=0&pid=Api&h=220&P=0",
    review:
      "Colors exactly pictures jese thay. Highly recommended store.",
  },
  {
    name: "Usman Tariq",
    city: "Multan",
    image: "https://i.pinimg.com/originals/a5/ce/17/a5ce177dd047d6cd79d897eae75dba53.jpg",
    review:
      "Price ke hisab se quality excellent hai. Customer support bhi bohat achi thi.",
  },
];

function CustomerReviews() {
  return (
    <Container className="my-5">

      <div className="text-center mb-5">
        <h2 className="text-white">What Our Customers Say</h2>
        <p className="text-secondary">
          Trusted by thousands of happy customers
        </p>
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={25}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
        }}
      >
        {reviews.map((item, index) => (
          <SwiperSlide key={index}>
            <Card className="review-card">

              <Card.Body>

                <img
                  src={item.image}
                  alt={item.name}
                  className="review-img"
                />

                <h5>{item.name}</h5>

                <small>{item.city}, Pakistan</small>

                <div className="stars">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                <p>{item.review}</p>

              </Card.Body>

            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

    </Container>
  );
}

export default CustomerReviews;