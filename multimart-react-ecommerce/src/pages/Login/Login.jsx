import { useForm } from 'react-hook-form'
import './Login.css'
import { login } from '../../api/auth.js'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext.jsx'

function Login () {
  const { register, handleSubmit } = useForm()
  const [Message, setMessage] = useState('')

  const { addUser, User } = useContext(UserContext)
  const navigate = useNavigate()

  const signin = async (user) => {
    try {
      const res = await login(user)
      addUser(res.data.data)
      navigate('/')
    } catch (err) {
      console.error(err.response.data)
      setMessage(err.response.data.message)
    }
  }

  const sendData = handleSubmit((data) => {
    const res = data
    signin(res)
  })

  useEffect(() => {
    console.log(User)
    if (User && Object.keys(User).length > 0) {
      navigate(-1)
    }
  }, [User, addUser])

  return (
    <div className='FormContent'>
      <h1>Sign In</h1>
      <form className='form-disposition' onSubmit={handleSubmit(sendData)}>
        <input className='form-input' placeholder='Enter your email' type='email' {...register('email', { required: true })} />
        <input className='form-input' placeholder='Enter your password' type='password' {...register('password', { required: true })} />
        <button className='Button' type='submit'>Ingresar</button>
      </form>
      <Link />
      <p className='FormMessage'>Not a user? <Link to='/register'>Registrar</Link></p>
      {Message ? (<div className='Alert'> {Message} </div>) : null}
    </div>

  )
}

export default Login
