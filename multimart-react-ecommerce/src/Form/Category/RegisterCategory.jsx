import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext.jsx'
import { registerCategory } from '../../api/category.js'

function RegisterCategory () {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const { User } = useContext(UserContext)
  const [Message, setMessage] = useState('')

  const handleRegister = async (data) => {
    try {
      await registerCategory(data)
      toast.success('Categoria registrada correctamente', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      navigate('/mycategory')
    } catch (err) {
      console.error(err.response.data)
      setMessage(err.response.data.message)
    }
  }

  const sendData = handleSubmit((data) => {
    const res = { ...data, storeId: User._id }
    console.log(res)
    handleRegister(res)
  })

  return (
    <div>
      <form className='form-disposition' onSubmit={handleSubmit(sendData)}>
        <h1>Actualizar Producto</h1>
        <input className='form-input' placeholder='Ingrese el nombre de la categoria' type='text' {...register('name', { required: 'Requiere nombre de la categoria' })} />
        {errors.name && <p>{errors.name.message}</p>}

        <input className='form-input' placeholder='Ingrese una descripcion' type='text' {...register('description', { required: 'Requiere una descripcion para la categoria' })} />
        {errors.description && <p>{errors.description.message}</p>}

        <button className='Button' type='submit'>Nueva categoria</button>
      </form>
      {Message ? (<div className='Alert'> {Message} </div>) : null}
    </div>
  )
}

export default RegisterCategory
