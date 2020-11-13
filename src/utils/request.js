import axios from 'axios'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  // baseURL: 'http://localhost:8090',
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers = {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        authorization: 'Bearer ' + getToken(),
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json, */*'
      }
    } else {
      config.headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json, text/plain, */*'
      }
    }
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
