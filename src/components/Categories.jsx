import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

import "../css/Categories.css";

const categories = [
  {
    name: "Men",
    image: "https://m.media-amazon.com/images/I/71IVO7rTYYL._AC_SL1500_.jpg",
  },
  {
    name: "Women",
    image: "https://img.kwcdn.com/product/1dab9aaa62/f1abadff-59d3-4842-802b-94907f445838_1350x1800.jpeg.a.jpeg",
  },
  {
    name: "Kids",
    image: "https://i5.walmartimages.com/seo/PatPat-Newborn-Baby-Girls-Clothes-Long-Sleeve-Romper-Jumpsuit-Striped-Pants-Outfit-Set-0-3-Months_db3d3c75-01a7-4151-8561-70ecb8c251eb.5a84450ec772907331cf7ca1bf7e732a.jpeg",
  },
  {
    name: "Hoodies",
    image: "https://cf.shopee.co.id/file/e6ef3afcf75b3011424058b0798da6a6",
  },
  {
    name: "T-Shirts",
    image: "https://cdn.clothbase.com/uploads/b61ca2a1-ff32-4840-8a60-0b257a4cb3ad/image.jpg",
  },
  {
    name: "Jeans",
    image: "https://lsco.scene7.com/is/image/lsco/A47500020-front-pdp-ld?fmt=jpeg&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=2000&hei=2500",
  },
  {
    name: "Jackets",
    image: "https://i5.walmartimages.com/seo/Men-s-Sherpa-Fleece-Lined-Denim-Jacket-Trucker-Jacket-Winter-Jean-Jacket-Cowboy-Coat_9e13abfa-2e8a-49e1-85e4-dc7a29e12dcf.6f7d6a10ea4bb12f90e13ec7ea524f5b.jpeg",
  },
  {
    name: "Shoes",
    image: "https://www.juniorcouture.qa/dw/image/v2/BGHV_PRD/on/demandware.static/-/Sites-JuniorCouture-Library/default/dwcb44ec55/APRIL25-SHOES.jpg?sw=475&sh=475",
  },
];

function Categories() {
  return (
    <Container className="my-5">

      <h2 className="text-white mb-4">
        Shop By Category
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          576: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 6,
          },
        }}
      >
        {categories.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="category-card">
              <img src={item.image} alt={item.name} />
              <h6>{item.name}</h6>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </Container>
  );
}

export default Categories;