import { useForm } from 'react-hook-form'
import { registerProduct } from '../../api/product.js'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext.jsx'
import { GetCategoryByStore } from '../../api/category.js'

function RegisterProducts () {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const [Category, setCategory] = useState([])
  const { User } = useContext(UserContext)
  const store = {
    id: User._id,
    name: User.name
  }
  const [Message, setMessage] = useState('')

  const RegisterProduct = async (data) => {
    try {
      await registerProduct(data)
      toast.success('Producto reistrado correctamente', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      navigate('/myproducts')
    } catch (err) {
      console.error(err.response.data)
      setMessage(err.response.data.message)
    }
  }

  useEffect(() => {
    GetCategoryByStore(User._id)
      .then(response => {
        const formattedCategories = response.data.categories.map(store => ({
          value: store._id,
          label: store.name
        }))
        setCategory(formattedCategories)
        console.log(response)
      })
  }, [])

  const sendData = handleSubmit((data) => {
    const selectedCategoryId = data.categories
    const selectedCategory = Category.find(category => category.value === selectedCategoryId)

    const res = {
      ...data,
      categories: {
        id: selectedCategoryId,
        name: selectedCategory ? selectedCategory.label : ''
      },
      Store: store
    }
    // console.log(res)
    RegisterProduct(res)
  })

  return (
    <div>
      <form className='form-disposition' onSubmit={handleSubmit(sendData)}>
        <h1>Registrar Producto</h1>
        <input className='form-input' placeholder='Enter product name' type='text' {...register('nameProduct', { required: 'Product name required' })} />
        {errors.nameProduct && <p>{errors.nameProduct.message}</p>}

        <input className='form-input' placeholder='Enter URL image' type='text' {...register('imgUrl', { required: 'imgUrl required' })} />
        {errors.imgUrl && <p>{errors.imgUrl.message}</p>}

        <select className='form-input' {...register('categories', { required: 'Category required' })}>
          <option hidden value=''>Enter category</option>
          {Category.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
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
