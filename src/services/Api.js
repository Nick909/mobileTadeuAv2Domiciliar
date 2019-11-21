import axios from 'axios'

const Api = axios.create({
    baseURL: 'http://51493000.ngrok.io'
})

export default Api