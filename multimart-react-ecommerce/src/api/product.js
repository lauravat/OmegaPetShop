import axios from './axios.js'

export const registerProduct = product => axios.post('/producto', product)
export const updateProduct = (id, product) => axios.put('/producto/' + id, product)
export const GetProducts = () => axios.get('/producto')
export const GetProduct = (id) => axios.get('/producto/' + id)
export const GetProductsByStore = (id) => axios.get('/producto/store/' + id)
export const GetCategory = (id) => axios.get('/producto/category/' + id)
