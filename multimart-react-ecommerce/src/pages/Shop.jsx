import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useEffect, useState } from "react";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { GetProducts } from "../api/product";

const Shop = () => {

  const [Products, setProducts] = useState([])
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    GetProducts()
      .then(response => {
        setProducts(response.data.data)
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error)
      })
  }, [])

  useEffect(() => {
    setFilterList(Products.filter(item => item.category === "Accesorios"));
  }, [Products]);

  useWindowScrollToTop();

  return (
    <Fragment>
      <Banner title="product" />
      <section className="filter-bar">
        <Container className="filter-bar-contianer">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect setFilterList={setFilterList} />
            </Col>
            <Col md={8}>
              {/* <SearchBar setFilterList={setFilterList} /> */}
            </Col>
          </Row>
        </Container>
        <Container>
          <ShopList productItems={filterList} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
