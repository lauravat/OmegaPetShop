import axios from './axios.js'

export const login = user => axios.post('/Login', user)
export const register = user => axios.post('/register', user)
