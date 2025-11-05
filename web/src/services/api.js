import axios from 'axios'

const api = axios.create({
    baseURL: 'https://proweb.leoproti.com.br/api'
})

export default api