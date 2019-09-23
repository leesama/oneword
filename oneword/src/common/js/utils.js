// 格式化Feed数据
export function formatFeedData(data) {
  const newData = []
  const map = {}
  for (const i of data) {
    const time = i.datetime.substring(0, 10)
    if (!map[time]) {
      newData.push({
        time,
        card: [i]
      })
      map[time] = true
    } else {
      for (const j of newData) {
        if (j.time === time) {
          j.card.push(i)
          break
        }
      }
    }
  }
  for (const i of newData) {
    const itime = i.time
    i.time = {
      year: itime.substr(0, 4),
      month: itime.substr(5, 2),
      day: itime.substr(8, 2)
    }
  }
  return newData
}
// 将数据变为一维对象
export function formatTo1Level(data) {
  const newArray = []
  data.forEach(i => { i.card.forEach(j => { newArray.push(j) }) })
  return newArray
}

/**
 * @description: // 移除transfrom属性，用relative定位替换
 * @param {type} 类名
 *
 */
export function removeTransfrom(el) {
  const dom = document.querySelector(el)
  if (dom.style && dom.style.transform) {
    const tranformLeft = dom.style.transform.split('(')[1].split(')')[0]
    const tranformTop = dom.style.transform.split('(')[2].split(')')[0]
    dom.setAttribute(
      'style',
      `position:relative;left:${tranformLeft};top:${tranformTop};`
    )
  }
}
