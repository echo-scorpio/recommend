import Cookies from 'js-cookie'

const TokenKey = 'id_token'
const name = "userName"
const admin = "adminName"
const json = 'tree'
const id = "discussId"

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function setUserName (userName) {
  return Cookies.set(name, userName)
}
export function setAdminName (userName) {
  return Cookies.set(admin, userName)
}
export function getUserName () {
  return Cookies.get(name)
}
export function getAdminName () {
  return Cookies.get(admin)
}
export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function removeUserName(){
  return Cookies.remove(name)
} 
export function removeAdminName(){
  return Cookies.remove(admin)
} 

export function setJson (data) {
  return Cookies.set(json, data)
}
export function setDiscussId (data) {
  return Cookies.set(id, data)
}
export function getDiscussId() {
  return Cookies.get(id)
}
