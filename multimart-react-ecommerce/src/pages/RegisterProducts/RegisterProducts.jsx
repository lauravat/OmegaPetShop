import { useForm } from 'react-hook-form'
import './Register.css'
import { registerProduct } from '../../api/product.js'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext.jsx'

function RegisterProducts () {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const { User } = useContext(UserContext)
  const store = {
    id: User._id,
    name: User.name
  }
  const [Message, setMessage] = useState('')

  const RegisterProduct = async (data) => {
    try {
      await registerProduct(data)
      toast.success('Successfully registered product', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      navigate('/shop')
    } catch (err) {
      console.error(err.response.data)
      setMessage(err.response.data.message)
    }
  }

  const sendData = handleSubmit((data) => {
    const res = { ...data, Store: store }
    console.log(res)
    RegisterProduct(res)
  })

  return (
    <div>
      <form className='form-disposition' onSubmit={handleSubmit(sendData)}>
        <h1>Product Register</h1>
        <input className='form-input' placeholder='Enter product name' type='text' {...register('nameProduct', { required: 'Product name required' })} />
        {errors.nameProduct && <p>{errors.nameProduct.message}</p>}

        <input className='form-input' placeholder='Enter URL image' type='text' {...register('imgUrl', { required: 'imgUrl required' })} />
        {errors.imgUrl && <p>{errors.imgUrl.message}</p>}

        <select className='form-input' {...register('category', { required: 'Category required' })}>
          <option hidden value=''>Enter category</option>
          <option value='Cuidado Animal'>Cuidado Animal</option>
          <option value='Juguetes'>Juguetes</option>
          <option value='Accesorios'>Accesorios</option>
          <option value='Snacks'>Snacks</option>
        </select>
        {errors.category && <p>{errors.category.message}</p>}

        <input className='form-input' placeholder='Enter price' type='number' {...register('price', { required: 'Price required', valueAsNumber: true })} />
        {errors.price && <p>{errors.price.message}</p>}

        <input className='form-input' placeholder='Enter description' type='text' {...register('description', { required: 'Description required' })} />
        {errors.description && <p>{errors.description.message}</p>}

        <input className='form-input' placeholder='Enter stock' type='number' {...register('cantidad', { required: 'Stock required', valueAsNumber: true })} />
        {errors.cantidad && <p>{errors.cantidad.message}</p>}
        <button className='Button' type='submit'>Nuevo producto</button>
      </form>
      {Message ? (<div className='Alert'> {Message} </div>) : null}
    </div>

  )
}

export default RegisterProducts
