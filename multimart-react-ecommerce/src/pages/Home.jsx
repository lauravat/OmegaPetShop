import { Fragment, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { GetProducts } from "../api/product";



const Home = () => {
  const [Products, setProducts] = useState([])


  useEffect(() => {
      GetProducts()
        .then(response => {
          setProducts(response.data.data)
        })
        .catch(error => {
          console.error('Error al obtener usuarios:', error)
        })
    }, [])

  const newArrivalData = Products.filter(
    (item) => item.category === "mobile" || item.category === "wireless"
  );
  const bestSales = Products.filter((item) => item.category === "sofa");
  useWindowScrollToTop();
  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      <Section
        title="New Arrivals"
        bgColor="white"
        productItems={newArrivalData}
      />
      <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} />
    </Fragment>
  );
};

export default Home;
