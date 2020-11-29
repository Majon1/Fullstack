import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/users'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }}

const getAll = async () => {
  const request = await axios.get(baseUrl, getConfig)
  return request.data
}


export default { getAll }