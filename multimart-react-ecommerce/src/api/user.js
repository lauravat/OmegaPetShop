import axios from './axios.js'

export const registerUser = user => axios.post('/usuario', user)
export const updateUser = (id, user) => axios.put('/usuario/' + id, user)
export const GetUsers = () => axios.get('/usuario')
export const GetStore = () => axios.get('/usuario/store')
