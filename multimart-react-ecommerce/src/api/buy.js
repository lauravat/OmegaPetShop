import axios from './axios.js'


export const registerBuy = buy => axios.post('/compra', buy)
export const updateBuy = buy => axios.patch('/compra', buy)
export const GetBuy = () => axios.get('/compra')