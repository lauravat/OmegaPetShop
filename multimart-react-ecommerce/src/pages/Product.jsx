import { Fragment, useEffect, useState } from 'react'
import Banner from '../components/Banner/Banner'
import { Container } from 'react-bootstrap'
import ShopList from '../components/ShopList'
import { useParams } from 'react-router-dom'
import ProductDetails from '../components/ProductDetails/ProductDetails'
import ProductReviews from '../components/ProductReviews/ProductReviews'
import useWindowScrollToTop from '../hooks/useWindowScrollToTop'
import { GetProducts } from '../api/product'

const Product = () => {
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

  const { id } = useParams()
  const [selectedProduct, setSelectedProduct] = useState(
    Products.filter((item) => item._id === id)[0]
  )
  const [relatedProducts, setRelatedProducts] = useState([])
  useEffect(() => {
    window.scrollTo(0, 0)
    setSelectedProduct(
      Products.filter((item) => item._id === id)[0]
    )
    setRelatedProducts(
      Products.filter(
        (item) =>
          item.category === selectedProduct?.category
      )
    )
  }, [Products, selectedProduct, id])

  useWindowScrollToTop()

  return (
    <>
      <Banner title={selectedProduct?.productName} />
      <ProductDetails selectedProduct={selectedProduct} />
      <ProductReviews selectedProduct={selectedProduct} />
      <section className='related-products'>
        <Container>
          <h3>You might also like</h3>
        </Container>
        <ShopList productItems={relatedProducts} />
      </section>
    </>
  )
}

export default Product
