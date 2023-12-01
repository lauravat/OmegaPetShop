import { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  decreaseQty,
  deleteProduct
} from '../app/features/cart/cartSlice'
import Modal from '../layout/modal'
import { useModal } from '../hooks/useModal'
import Confirm from '../Form/Confirm'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart)
  const { Open: openConfirm, ToggleState: toggleConfirm } = useModal()
  const navigate = useNavigate()
  const { User } = useContext(UserContext)

  const [Message, setMessage] = useState(null)
  const dispatch = useDispatch()
  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  )
  console.log(cartList)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const HandleSubmit = async () => {
    if (!User) {
      navigate('/login')
      return
    }

    if (cartList.length === 0) {
      setMessage('No hay productos en el carrito')
      return
    }

    toggleConfirm()
  }

  return (
    <section className='cart-items'>
      <Container>
        <Row className='justify-content-center'>
          <Col md={8}>
            {cartList.length === 0 && (
              <h1 className='no-items product'>No Items are add in Cart</h1>
            )}
            {cartList.map((item) => {
              const productQty = item.price * item.qty
              return (
                <div className='cart-list' key={item._id}>
                  <Row>
                    <Col className='image-holder' sm={4} md={3}>
                      <img src={item.imgUrl} alt='' />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className='cart-content justify-content-center'>
                        <Col xs={12} sm={9} className='cart-details'>
                          <h3>{item.productName}</h3>
                          <h4>
                            ${item.price}.00 * {item.qty}
                            <span>${productQty}.00</span>
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className='cartControl'>
                          <button
                            className='incCart'
                            onClick={() =>
                              dispatch(addToCart({ product: item, num: 1 }))}
                          >
                            <i className='fa-solid fa-plus' />
                          </button>
                          <button
                            className='desCart'
                            onClick={() => dispatch(decreaseQty(item))}
                          >
                            <i className='fa-solid fa-minus' />
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <button
                      className='delete'
                      onClick={() => dispatch(deleteProduct(item))}
                    >
                      <ion-icon name='close' />
                    </button>
                  </Row>
                </div>
              )
            })}
          </Col>
          <Col md={4}>
            <div className='cart-total'>
              <h2>Cart Summary</h2>
              <div className=' d_flex'>
                <h4>Precio total :</h4>
                <h3>${totalPrice}.00</h3>
              </div>
              <button className='Button' onClick={HandleSubmit}>Checkout</button>
              {Message && (
                <div className='error-message'>
                  <p>{Message}</p>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      {openConfirm &&
        <Modal CloseModal={toggleConfirm}>
          <Confirm CloseModal={toggleConfirm} Error={setMessage} />
        </Modal>}
    </section>
  )
}

export default Cart
