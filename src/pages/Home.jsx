import Categories from "../components/Categories.jsx";
import Features from "../components/Features.jsx";
import Hero from "../components/Hero.jsx";
import NewArrival from "../components/NewArrival.jsx";
import TrendingCollection from "../components/TrendingCollection.jsx";
import CustomerReviews from "../components/CustomerReviews.jsx";

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Categories />
      <NewArrival />
      <TrendingCollection />
      <CustomerReviews />
    </>
  );
}



export default Home;