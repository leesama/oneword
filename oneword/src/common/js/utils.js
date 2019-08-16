// 格式化Feed数据
export function formatFeedData (data) {
  let newData = []
  let map = {}
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
