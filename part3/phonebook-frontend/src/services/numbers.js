import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const createNumber = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const updateNumber = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteNumber = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { 
    getAll, 
    createNumber, 
    updateNumber,
    deleteNumber
}