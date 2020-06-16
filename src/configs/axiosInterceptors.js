import axios from 'axios'

axios.interceptors.request.use(request => {
  if (localStorage.organicerAuthToken && request.url.indexOf('auth') === -1) {
    request.headers['Authorization'] = `${window.localStorage.organicerAuthToken}`
  }
  return request
})

axios.interceptors.response.use(null, err => {
  if (err.message === 'Request failed with status code 401') {
    localStorage.clear()
    window.location = '/login'
  }
  return Promise.reject(err)
})