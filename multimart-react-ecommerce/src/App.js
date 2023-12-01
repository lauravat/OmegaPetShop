import { lazy, Suspense } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Loader from './components/Loader/Loader'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Logout from './pages/Logout'
import ProtectedRoute from './layout/protectedRoute'
import RegisterProducts from './pages/RegisterProducts/RegisterProducts'
import MyProducts from './pages/MyProducts'
import MyCategory from './pages/MyCategory'
const Home = lazy(() => import('./pages/Home'))
const Shop = lazy(() => import('./pages/Shop'))
const Cart = lazy(() => import('./pages/Cart'))
const Product = lazy(() => import('./pages/Product'))
function App () {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/shop' element={<Shop />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/registerProducts' element={<RegisterProducts />} />
            <Route path='/Myproducts' element={<MyProducts />} />
            <Route path='/Mycategory' element={<MyCategory />} />

          </Route>
          <Route path='/shop/:id' element={<Product />} />

          <Route path='/cart' element={<Cart />} />
        </Routes>
        <Footer />
        <ToastContainer
          position='top-right'
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </Router>
    </Suspense>
  )
}

export default App
