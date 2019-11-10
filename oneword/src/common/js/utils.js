// 格式化Card数据
// 根据时间进行分组
export function formatCardData(data) {}
// 将数据变为一维对象
export function formatTo1Level(data) {
  const newArray = []
  data.forEach(i => {
    i.card.forEach(j => {
      newArray.push(j)
    })
  })
  return newArray
}

/**
 * @description:base46图片转换为file
 * @param {type}
 * @return:
 */
export function base64ToFile(dataurl, filename) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

/**
 * @description:  FileReader 函数
 * @param {type}
 * @return: promise
 */
export function reader(file, options) {
  options = options || {}
  return new Promise(function(resolve, reject) {
    let reader = new FileReader()

    reader.onload = function() {
      resolve(reader)
    }
    reader.onerror = reject
    if (options.accept && !new RegExp(options.accept).test(file.type)) {
      reject(new Error('wrong file type'))
    }

    if (!file.type || /^text\//i.test(file.type)) {
      reader.readAsText(file)
    } else {
      reader.readAsDataURL(file)
    }
  })
}
const toString = Object.prototype.toString

export function isDate(val) {
  return toString.call(val) === '[object Date]'
}
export function isPlainObject(val) {
  return toString.call(val) === '[object Object]'
}
export function isBoolean(val) {
  return toString.call(val) === '[object Boolean]'
}
