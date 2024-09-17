// 手机号格式校验
export function isValidPhone(number: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(number)
}

// 邮箱格式校验
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[\w.-]+@[a-z0-9.-]+\.[a-z]{2,6}$/i
  return emailRegex.test(email)
}
