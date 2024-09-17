import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import localforage from 'localforage'

localforage.config({
  name: 'myAppDB', // 存储名称
  storeName: 'myStore', // 存储区域名称
})
const app = createApp(App)

// 初始化数据库表

app.mount('#app')
