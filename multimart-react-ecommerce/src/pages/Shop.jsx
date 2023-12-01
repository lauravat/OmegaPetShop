import { Col, Container, Row } from 'react-bootstrap'
import FilterSelect from '../components/FilterSelect'
import { useEffect, useState } from 'react'
import ShopList from '../components/ShopList'
import Banner from '../components/Banner/Banner'
import useWindowScrollToTop from '../hooks/useWindowScrollToTop'
import { GetProducts } from '../api/product'

const Shop = () => {
  const [Products, setProducts] = useState([])
  const [filterList, setFilterList] = useState([])
  console.log(filterList)

  useEffect(() => {
    GetProducts()
      .then(response => {
        setProducts(response.data.data)
        console.log(response.data.data)
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error)
      })
  }, [])

  useEffect(() => {
    setFilterList(Products.filter(item => item.categories.name !== ''))
  }, [Products])

  useWindowScrollToTop()

  return (
    <>
      <Banner title='product' />
      <section className='filter-bar'>
        <Container className='filter-bar-contianer'>
          <Row className='justify-content-between' style={{ width: '100vw' }}>
            <Col>
              <FilterSelect setFilterList={setFilterList} />
            </Col>
            <Col md={2} />
          </Row>

        </Container>
        <Container>
          <ShopList productItems={filterList} />
        </Container>
      </section>
    </>
  )
}

export default Shop
