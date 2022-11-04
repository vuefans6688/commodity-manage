import { baseUrl } from './env'

export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase()
  url = baseUrl + url
  if (type === 'GET') {
    let dataString = '' // 数据拼接字符串
    Object.keys(data).forEach(key => {
      dataString += key + '=' + data[key] + '&'
    })
    if (dataString !== '') {
      dataString = dataString.substr(0, dataString.lastIndexOf('&'))
      url = url + '?' + dataString
    }
  }
  if (window.fetch && method === 'fetch') {
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: "cors",
      cache: "force-cache"
    }
    if (type === 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }
    try {
      const response = await fetch(url, requestConfig)
      const responseJson = await response.json()
      return responseJson
    } catch (error) {
      throw new Error(error)
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObject
      if (window.XMLHttpRequest) {
        requestObject = new XMLHttpRequest()
      } else {
        requestObject = new ActiveXObject
      }

      let sendText = ''
      if (type === 'POST') {
        sendText = JSON.stringify(data)
      }
      requestObject.open(type, url, true)
      requestObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
      requestObject.send(sendText)
      requestObject.onreadystatechange = () => {
        if (requestObject.readyState === 4) {
          if (requestObject.status === 200) {
            let response = requestObject.response
            if (typeof response !== 'object') {
              response = JSON.parse(response)
            }
            resolve(response)
          } else {
            reject(requestObject)
          }
        }
      }
    })
  }
}