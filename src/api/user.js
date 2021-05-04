import request from '@/utils/request'
// import { encryptedData } from '@/utils/encrypt'
import { loginRSA, tokenName } from '@/config'

export async function login(data) {
  // if (loginRSA) {
  //   data = await encryptedData(data)
  // }
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}

export function getUserInfo(accessToken) {
  return request({
    url: '/selectUser',
    method: 'post',
    data: {
      [tokenName]: accessToken,
    },
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}

export function register(data) {
  return request({
    url: '/insertUser',
    method: 'post',
    data
  })
}

export function getUserInfoList(userid) {
  return request({
    url: '/showInformation',
    method: 'post',
    data: {
      userId: userid
    }
  })
}

export function UpdateUserList(data) {
  return request({
    url: '/updateInformation',
    method: 'post',
    data
  })
}

export function updatePassword(data) {
  return request({
    url: '/updatePassword',
    method: 'post',
    data
  })
}

export function selectAddressesByUserId(data) {
  return request({
    url: '/selectAddressesByUserId',
    method: 'post',
    data
  })
}

export function insertAddress(data) {
  return request({
    url: '/insertAddress',
    method: 'post',
    data
  })
}
