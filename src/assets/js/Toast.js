import Vue from 'vue'
import Toast from '@/components/Toast.vue'

let ToastConstructor = Vue.extend(Toast) // 构造函数
let instance // 实例对象
let seed = 1 // 计数

const ToastDialog = (options = {}) => {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  let id = `toast_${seed++}`
  instance = new ToastConstructor({
    data: options
  })
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
  instance.dom = instance.vm.$el
  instance.dom.style.zIndex = 999 + seed
  return instance.vm
}

export default ToastDialog