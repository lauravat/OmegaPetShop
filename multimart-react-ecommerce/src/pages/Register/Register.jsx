import { useForm } from 'react-hook-form'
import './Register.css'
import { register as registerFetch } from '../../api/auth.js'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext.jsx'

function Register () {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [Message, setMessage] = useState('')

  const { addUser, User } = useContext(UserContext)
  const navigate = useNavigate()

  const SignUp = async (user) => {
    try {
      const res = await registerFetch(user)
      console.log(res)
      addUser(res.data)
    } catch (err) {
      console.error(err.response.data)
      setMessage(err.response.data.message)
    }
  }

  const sendData = handleSubmit((data) => {
    const res = data
    SignUp(res)
  })

  useEffect(() => {
    console.log(User)
    if (User && Object.keys(User).length > 0 && User.role !== 'Tienda') {
      navigate('/')
    }
  }, [User, addUser])

  return (
    <div className='FormContent'>
      <h1>Ingresar</h1>
      <form className='form-disposition' onSubmit={handleSubmit(sendData)}>
        <input className='form-input' placeholder='Enter your name' type='text' {...register('name', { required: 'Name required' })} />
        {errors.name && <p>{errors.name.message}</p>}

        <input className='form-input' placeholder='Enter your lastname' type='text' {...register('lastname', { required: 'LastName required' })} />
        {errors.lastname && <p>{errors.lastname.message}</p>}

        <input className='form-input' placeholder='Enter your email' type='text' {...register('email', { required: 'Email required' })} />
        {errors.email && <p>{errors.email.message}</p>}

        <input className='form-input' placeholder='Enter your phone' type='number' {...register('phone', { required: 'Phone required', valueAsNumber: true })} />
        {errors.phone && <p>{errors.phone.message}</p>}

        <input className='form-input' placeholder='Enter your adress' type='text' {...register('adress', { required: 'Adress required' })} />
        {errors.adress && <p>{errors.adress.message}</p>}

        {
        User && (User.role === 'Admin')
          ? (
            <>
              <select className='form-input' {...register('role', { required: 'Role required' })}>
                <option hidden value=''>Role</option>
                <option value='Admin'>Admin</option>
                <option value='User'>User</option>
              </select>
              {errors.role && <p>{errors.role.message}</p>}

            </>
            )
          : null
        }

        <input className='form-input' placeholder='Enter your password' type='password' {...register('password', { required: 'Password required' })} />
        {errors.password && <p>{errors.password.message}</p>}
        <button className='Button' type='submit'>Sign Up</button>
      </form>
      <Link />
      <p className='FormMessage'>Already a user? <Link to='/Login'>Log in</Link></p>
      {Message ? (<div className='Alert'> {Message} </div>) : null}
    </div>

  )
}

export default Register
