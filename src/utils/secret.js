import CryptoJS from 'crypto-js/crypto-js'
 
// 默认的 KEY 与 iv
const KEY = CryptoJS.enc.Utf8.parse('qwertyuiopasdf12') // ''中与后台一样  密码
const IV = CryptoJS.enc.Utf8.parse('qwertyuiopasdf12') // ''中与后台一样，
// qwertyuiopasdf12  可随意自己定义，但是必须满足十六位，必须与后台的一致
 
/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function encrypt(word) {
  const key = KEY
  const iv = IV
  const srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}
 
/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 */
export function decrypt(word) {
  const key = KEY
  const iv = IV
  const base64 = CryptoJS.enc.Base64.parse(word)
  const src = CryptoJS.enc.Base64.stringify(base64)
  var decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
