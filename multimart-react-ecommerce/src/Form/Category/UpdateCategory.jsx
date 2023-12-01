import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { updateCategory, GetCategory } from '../../api/category.js'

function UpdateCategory ({ id }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [Category, setCategory] = useState([])
  const navigate = useNavigate()
  const [Message, setMessage] = useState('')

  const UpdateProduct = async (data) => {
    try {
      const res = await updateCategory(id, data)
      console.log(res)
      toast.success('Producto registrado correctamente', {
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

  useEffect(() => {
    GetCategory(id)
      .then(response => {
        setCategory(response.data.data)
        Object.keys(response.data).forEach(key => {
          setValue(key, response.data[key])
        })
      })
  }, [id])

  const sendData = handleSubmit((categoryData) => {
    const { name, description } = categoryData
    const result = { name, description }
    console.log(result)
    UpdateProduct(result)
  })

  return (
    <div>
      <form className='form-disposition' onSubmit={handleSubmit(sendData)}>
        <h1>Actualizar Producto</h1>
        <input className='form-input' placeholder='Ingrese el nombre de la categoria' type='text' defaultValue={Category?.name} {...register('name', { required: 'Requiere nombre de la categoria' })} />
        {errors.name && <p>{errors.name.message}</p>}

        <input className='form-input' placeholder='Ingrese una descripcion' type='text' defaultValue={Category?.description} {...register('description', { required: 'Requiere una descripcion para la categoria' })} />
        {errors.description && <p>{errors.description.message}</p>}

        <button className='Button' type='submit'>Nueva categoria</button>
      </form>
      {Message ? (<div className='Alert'> {Message} </div>) : null}
    </div>

  )
}

export default UpdateCategory
