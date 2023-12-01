import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearCart } from '../app/features/cart/cartSlice'
import { registerBuy } from '../api/buy'
import { useForm } from 'react-hook-form'
import { updateUser } from '../api/user'

function Confirm ({ Error, CloseModal }) {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const { User } = useContext(UserContext)
  const dispatch = useDispatch()

  const { cartList } = useSelector((state) => state.cart)

  console.log(errors)

  useEffect(() => {
    console.log(User)
  }, [])

  const sendData = handleSubmit(async (data) => {
    console.log(data)
    const Buy = {
      products: cartList,
      user: {
        _id: User._id,
        name: User.name
      }
    }
    try {
      const UserUpdate = await updateUser(User._id, data)
      console.log(UserUpdate)
      const res = await registerBuy(Buy)
      console.log(res)
      CloseModal(true)
      dispatch(clearCart())
      toast.success('Successful purchase', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    } catch (err) {
      console.error(err)
      Error(err)
    }
  })
  return (
    <div>
      <form className='form-disposition' onSubmit={handleSubmit(sendData)}>
        <h1>Por favor, confirme la información.</h1>
        <input className='form-input' placeholder='Enter your name' defaultValue={User?.name} type='text' {...register('name', { required: 'Name required' })} />
        {errors.name && <p>{errors.name.message}</p>}

        <input className='form-input' placeholder='Enter your lastname' defaultValue={User?.lastname} type='text' {...register('lastname', { required: 'LastName required' })} />
        {errors.lastname && <p>{errors.lastname.message}</p>}

        <input className='form-input' placeholder='Enter your email' defaultValue={User?.email} type='email' {...register('email', { required: 'Email required' })} />
        {errors.email && <p>{errors.email.message}</p>}

        <input className='form-input' placeholder='Enter your phone' defaultValue={User?.phone} type='number' {...register('phone', { required: 'Phone required', valueAsNumber: true })} />
        {errors.phone && <p>{errors.phone.message}</p>}

        <input className='form-input' placeholder='Enter your adress' defaultValue={User?.adress} type='text' {...register('adress', { required: 'Adress required' })} />
        {errors.adress && <p>{errors.adress.message}</p>}
        <button className='Button' type='submit'>Confirmar</button>
      </form>
    </div>
  )
}

export default Confirm
