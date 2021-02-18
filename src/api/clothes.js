import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/SelectClothesListByBusinessId',
    method: 'post',
    data,
  })
}

export function doQuery(data) {
  return request({
    url: '/SelectByInputName',
    method: 'post',
    data,
  })
}

export function doAdd(data) {
  return request({
    url: '/insertClothes',
    method: 'post',
    data,
  })
}

export function doUpdate(data) {
  return request({
    url: '/updateClothes',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/deleteClothes',
    method: 'post',
    data,
  })
}

export function doDeleteList(data) {
  return request({
    url: '/deleteClothesList',
    method: 'post',
    data,
  })
}

export function getTag(data) {
  return request({
    url: '/selectAllTagList',
    method: 'post',
    data,
  })
}

export function deleteTag(data) {
  return request({
    url: '/deleteTag',
    method: 'post',
    data,
  })
}

export function deleteTagList(data) {
  return request({
    url: '/deleteTag',
    method: 'post',
    data,
  })
}

export function insertTag(data) {
  return request({
    url: '/insertTag',
    method: 'post',
    data,
  })
}
