import Select from 'react-select';
import { useEffect, useState } from 'react';
import { GetProducts } from '../api/product';

const options = [
    { value: "Cuidado Animal", label: "Cuidado Animal" },
    { value: "Juguetes", label: "Juguetes" },
    { value: "Accesorios", label: "Accesorios" },
    { value: "Snacks", label: "Snacks" },
];

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#0f3460",
        color: "white",
        borderRadius: "5px",
        border: "none",
        boxShadow: "none",
        width: "200px",
        height: "40px",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#0f3460" : "white",
        color: state.isSelected ? "white" : "#0f3460",
        "&:hover": {
        backgroundColor: "#0f3460",
        color: "white",
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "white",
    }),
};

const FilterSelect = ({setFilterList}) => {

  const [Products, setProducts] = useState([])


    useEffect(() => {
        GetProducts()
          .then(response => {
            setProducts(response.data.data)
          })
          .catch(error => {
            console.error('Error al obtener usuarios:', error)
          })
      }, [])
    
    const handleChange = (selectedOption)=> {
        setFilterList(Products.filter(item => item.category ===selectedOption.value))
    }
    return (
    <Select
    options={options}
    defaultValue={{ value: "", label: "Filter By Category" }}
    styles={customStyles}
    onChange={handleChange}
    />
    );
};

export default FilterSelect;
