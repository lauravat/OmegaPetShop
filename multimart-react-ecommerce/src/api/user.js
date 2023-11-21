import axios from './axios.js'


export const registerUser = user => axios.post('/usuario', user)
export const updateUser = user => axios.patch('/usuario', user)
export const GetUsers = () => axios.get('/usuario')