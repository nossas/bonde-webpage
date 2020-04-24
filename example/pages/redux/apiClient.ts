import axios from 'axios'

export default axios.create({
  baseURL: 'https://api-rest.staging.bonde.org'
})
