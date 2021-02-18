import request from '@/utils/request'

export function getWeek(data) {
  return request({
    url: '/WeekSellCount',
    method: 'post',
    data,
  })
}

export function getMonth(data) {
  return request({
    url: '/MonthSellCount',
    method: 'post',
    data,
  })
}

export function getImg(data) {
  return request({
    url: '/showClothesImg',
    method: 'post',
    data,
  })
}
