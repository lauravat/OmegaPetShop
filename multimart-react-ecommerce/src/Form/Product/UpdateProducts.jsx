import { useForm } from 'react-hook-form'
import { GetProduct, updateProduct } from '../../api/product.js'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext.jsx'
import { GetCategoryByStore } from '../../api/category.js'

function UpdateProducts ({ id }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [Product, setProduct] = useState(null)
  const [Category, setCategory] = useState([])
  const navigate = useNavigate()
  const { User } = useContext(UserContext)
  const [Message, setMessage] = useState('')

  const UpdateProduct = async (data) => {
    try {
      await updateProduct(id, data)
      toast.success('Producto actualizado correctamente', {
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
    GetProduct(id)
      .then(response => {
        setProduct(response.data)
        Object.keys(response.data).forEach(key => {
          setValue(key, response.data[key])
        })
      })
    GetCategoryByStore(User._id)
      .then(response => {
        const formattedCategories = response.data.categories.map(store => ({
          value: store._id,
          label: store.name
        }))
        setCategory(formattedCategories)
        console.log(response)
      })
  }, [id])

  console.log(Category)

  const sendData = handleSubmit((data) => {
    const selectedCategoryId = data.categories
    const selectedCategory = Category.find(category => category.value === selectedCategoryId)

    const res = {
      ...data,
      categories: {
        id: selectedCategoryId,
        name: selectedCategory ? selectedCategory.label : ''
      }
    }
    UpdateProduct(res)
  })

  return (
    <div>
      <form className='form-disposition' onSubmit={handleSubmit(sendData)}>
        <h1>Actualizar Producto</h1>
        <input className='form-input' placeholder='Enter product name' type='text' defaultValue={Product?.nameProduct} {...register('nameProduct', { required: 'Product name required' })} />
        {errors.nameProduct && <p>{errors.nameProduct.message}</p>}

        <input className='form-input' placeholder='Enter URL image' type='text' defaultValue={Product?.imgUrl} {...register('imgUrl', { required: 'imgUrl required' })} />
        {errors.imgUrl && <p>{errors.imgUrl.message}</p>}

        <select className='form-input' defaultValue={Product?.category} {...register('categories', { required: 'Category required' })}>
          <option hidden value=''>Enter category</option>
          {Category.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        {errors.category && <p>{errors.category.message}</p>}

        <input className='form-input' placeholder='Enter price' type='number' defaultValue={Product?.price} {...register('price', { required: 'Price required', valueAsNumber: true })} />
        {errors.price && <p>{errors.price.message}</p>}

        <input className='form-input' placeholder='Enter description' type='text' defaultValue={Product?.description} {...register('description', { required: 'Description required' })} />
        {errors.description && <p>{errors.description.message}</p>}

        <input className='form-input' placeholder='Enter stock' type='number' defaultValue={Product?.cantidad} {...register('cantidad', { required: 'Stock required', valueAsNumber: true })} />
        {errors.cantidad && <p>{errors.cantidad.message}</p>}
        <button className='Button' type='submit'>Nuevo producto</button>
      </form>
      {Message ? (<div className='Alert'> {Message} </div>) : null}
    </div>

  )
}

export default UpdateProducts
