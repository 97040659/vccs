import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/SelectOrderListByBusinessId',
    method: 'post',
    data,
  })
}

export function deleteOrder(data) {
  return request({
    url: '/deleteOrder',
    method: 'post',
    data,
  })
}

export function deleteOrderList(data) {
  return request({
    url: '/deleteOrderByList',
    method: 'post',
    data,
  })
}

export function doUpdate(data) {
  return request({
    url: '/updateOrder',
    method: 'post',
    data,
  })
}

export function doDelivery(data) {
  return request({
    url: '/BusinessUpdateOrderState_Senting',
    method: 'post',
    data,
  })
}

export function getAddress(data) {
  return request({
    url: '/selectAddressesByUserId',
    method: 'post',
    data,
  })
}

export function getRentList(data) {
  return request({
    url: '/selectAllRentorderByBusinessId',
    method: 'post',
    data,
  })
}


export function doRentUpdate(data) {
  return request({
    url: '/updateRentOrder',
    method: 'post',
    data,
  })
}

export function deleteRentOrder(data) {
  return request({
    url: '/deleteRentOrder',
    method: 'post',
    data,
  })
}

export function getRefund(data) {
  return request({
    url: '/SelectRefundSellOrder',
    method: 'post',
    data,
  })
}

export function doQuery(data) {
  return request({
    url: '/SelectUnSentSellOrder',
    method: 'post',
    data,
  })
}

export function getRentRefund(data) {
  return request({
    url: '/SelectRefundRentOrder',
    method: 'post',
    data,
  })
}

export function doRentQuery(data) {
  return request({
    url: '/SelectUnSentRentOrder',
    method: 'post',
    data,
  })
}

export function doComplete(data) {
  return request({
    url: '/BusinessUpdateOrderState_RefundOrReturnComplete',
    method: 'post',
    data,
  })
}
