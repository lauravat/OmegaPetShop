import Select from 'react-select'
import { useEffect, useState } from 'react'
import { GetProducts } from '../api/product'
import { GetCategories } from '../api/category'

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#0f3460',
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    boxShadow: 'none',
    width: '200px',
    height: '40px'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#0f3460' : 'white',
    color: state.isSelected ? 'white' : '#0f3460',
    '&:hover': {
      backgroundColor: '#0f3460',
      color: 'white'
    }
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white'
  })
}

const FilterSelect = ({ setFilterList }) => {
  const [Products, setProducts] = useState([])
  const [options, setoptions] = useState([])

  useEffect(() => {
    GetProducts()
      .then(response => {
        setProducts(response.data.data)
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error)
      })
    GetCategories()
      .then(response => {
        console.log(response.data.data)
        const formattedCategories = response.data.data.map(store => ({
          value: store._id,
          label: store.name
        }))
        setoptions(formattedCategories)
      })
    // }
  }, [])

  const handleChange = (selectedOption) => {
    console.log('Esto')
    console.log(Products)

    setFilterList(Products.filter(item => item.categories.name === selectedOption.label))
  }
  return (
    <Select
      options={options}
      defaultValue={{ value: '', label: 'Filter By Category' }}
      styles={customStyles}
      onChange={handleChange}
    />
  )
}

export default FilterSelect
