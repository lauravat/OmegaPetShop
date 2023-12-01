import axios from './axios.js'

export const registerCategory = product => axios.post('/categoria', product)
export const updateCategory = (id, product) => axios.put('/categoria/' + id, product)
export const GetCategories = () => axios.get('/categoria')
export const GetCategory = (id) => axios.get('/categoria/' + id)
export const GetCategoryByStore = (id) => axios.get('/categoria/store/' + id)
