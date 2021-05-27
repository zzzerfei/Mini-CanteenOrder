import request from './network.js'


export function getHistory(openId) {
  return request({
    url: '/order/getHistory',
    method:'GET',
    data: {
      openId,
    }
  })
} 