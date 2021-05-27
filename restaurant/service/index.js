import request from './network.js'

export function getSearch(condition) {
  return request({
    url: '/search/select/',
    method:'GET',
    data: {
      condition,
    }
  })
} 

export function getByCanteenId(id) {
  return request({
    url: '/index/getByCanteenId',
    method:'GET',
    data: {
      id:id+1,
    }
  })
} 

export function register(customer) {
  return request({
    url: '/index/insertCustomer',
    method:'POST',
    // dataType:'json',
    data: JSON.stringify(customer)
  })
} 
