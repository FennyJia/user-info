<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { User } from './api/user'
import { isValidEmail, isValidPhone } from './api/utils'
import { loadData, saveData } from './api/forage'

const editMode = ref(false)
const viewCls = {
  border: '1px solid rgb(240, 240, 240)',
  padding: '6px 6px 6px 20px',
}
const editCls = {
  border: '1px solid rgb(69, 152, 250)',
  padding: '6px 6px 6px 20px',
}
const errorCls = {
  border: '1px solid red',
  padding: '6px 6px 6px 20px',
}
const viewStyle = {
  phone: viewCls,
  email: viewCls,
  name: viewCls,
}
const editStyle = {
  phone: editCls,
  email: editCls,
  name: editCls,
}
const inputStyle = ref({})
const emailError = ref(false)
const phoneError = ref(false)

const user: User = ref({})
async function loadUserInfo() {
  const row = await loadData('user')
  if (row) {
    user.value = row
  }
  else {
    user.value = {
      name: 'Jiajia Ding',
      email: '1479138453@qq.com',
      phone: '15256532624',
      id: 1,
    }
    await saveData('user', user.value)
  }
};

async function saveUser() {
  validatePhone()
  if (phoneError.value) {
    inputStyle.value.phone = errorCls
  }
  validateEmail()
  if (emailError.value) {
    inputStyle.value.email = errorCls
  }
  if (phoneError.value || emailError.value) {
    return
  }
  await saveData('user', user.value)
  loadUserInfo()
  editMode.value = false
  inputStyle.value = viewStyle
};

function validatePhone() {
  phoneError.value = !isValidPhone(user.value.phone)
  if (phoneError.value) {
    inputStyle.value.phone = errorCls
  }
  else {
    inputStyle.value.phone = editCls
  }
}
function validateEmail() {
  emailError.value = !isValidEmail(user.value.email)
  if (emailError.value) {
    inputStyle.value.email = errorCls
  }
  else {
    inputStyle.value.email = editCls
  }
}

function edit() {
  inputStyle.value = editStyle
  editMode.value = true
}

function cancel() {
  editMode.value = false
  phoneError.value = false
  emailError.value = false
  loadUserInfo()
  inputStyle.value = viewStyle
}
onMounted(async () => {
  inputStyle.value = viewStyle
  loadUserInfo()
})
</script>

<template>
  <div>
    <div :style="editMode ? 'input {border-color: blue;}' : ''">
      <p class="container">
        <span class="label">邮 箱</span>
        <input v-model="user.email" :readonly="!editMode" :style="inputStyle.email" placeholder="请输入邮箱" @blur="validateEmail">
      </p>
      <p class="container">
        <span class="label">用户名</span>
        <input v-model="user.name" :readonly="!editMode" :style="inputStyle.name" placeholder="请输入用户名">
      </p>
      <p class="container">
        <span class="label">手机号</span>
        <input v-model="user.phone" :readonly="!editMode" :style="inputStyle.phone" placeholder="请输入手机号" @blur="validatePhone">
      </p>
      <button v-if="!editMode" @click="edit">
        编辑
      </button>
      <button v-if="editMode" style="border-color: rgb(240, 242, 245);color: rgb(60 60 60 / 87%);margin-right: 0px;" @click="cancel">
        取消
      </button>
      <button v-if="editMode" style="margin-right: -90px;" @click="saveUser">
        保存
      </button>
    </div>
  </div>
</template>

<style scoped>
.label {
  min-width: 55px;
  margin-right: 20px;
  text-align: right;
}

.container {
  display: flex;
}

span {
  flex: 1 1 30%; /* flex-grow, flex-shrink, flex-basis */
}

input {
  flex: 1 1 70%; /* flex-grow, flex-shrink, flex-basis */
}

button {
  display: inline-block;
  line-height: 0.6;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #409eff;
  color: #409eff;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 50px -180px 20px 20px;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
</style>
