// import { login, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    }
  },

  actions: {
    // 登录token
    // Login ({ commit }, userInfo) {
    //   const username = userInfo.username.trim()
    //   return new Promise((resolve, reject) => {
    //     login(username, userInfo.password)
    //       .then(response => {
    //         const data = response
    //         setToken(data.id_token)
    //         commit('SET_TOKEN', data.id_token)
    //         resolve()
    //       })
    //       .catch(error => {
    //         reject(error)
    //       })
    //   })
    // },

    // // 获取用户信息
    // GetInfo ({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo(state.token)
    //       .then(response => {
    //         const data = response
    //         // console.log(response)
    //         // commit('SET_ROLES', data.authorities)
    //         commit('SET_NAME', data.userName)
    //         // commit('SET_AVATAR', data.avatar)
    //         resolve(response)
    //       })
    //       .catch(error => {
    //         reject(error)
    //       })
    //   })
    // },

    // 登出
    // LogOut ({ commit, state }) {
    //   removeToken()
    //   // return new Promise((resolve, reject) => {
    //   //   logout(state.token)
    //   //     .then(() => {
    //   //       commit('SET_TOKEN', '')
    //   //       commit('SET_ROLES', [])
    //   //       removeToken()
    //   //       console.log(getToken())
    //   //       resolve()
    //   //     })
    //   //     .catch(error => {
    //   //       reject(error)
    //   //     })
    //   // })
    // },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
