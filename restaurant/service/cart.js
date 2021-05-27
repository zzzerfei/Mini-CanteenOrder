import request from './network.js'

export function addOrder(pack) {
  return request({
    url: '/order/addOrder',
    method:'Post',
    data: pack
  })
} 