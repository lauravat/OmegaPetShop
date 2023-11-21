import axios from './axios.js'


export const registerProduct = product => axios.post('/producto', product)
export const updateRegister = product => axios.patch('/producto', product)
export const GetProducts = () => axios.get('/producto')