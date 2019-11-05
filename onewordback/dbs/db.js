const { Sequelize, Model } = require('sequelize')
const { unset, clone, isArray } = require('lodash')
const moment = require('moment')
const { dbName, host, port, user, password } = require('./config').dbs
const { host: imgHost } = require('./config')

const sequelize = new Sequelize(dbName, user, password, {
  host,
  port,
  timezone: '+08:00',
  dialect: 'postgres',
  define: {
    timestamps: true,
    // 开启delete_time
    paranoid: true,
    createdAt: 'datetime',
    updatedAt: 'updatedtime',
    deletedAt: 'deletedtime',
    // 驼峰改为下划线
    underscored: true,
    // 默认false修改表名为复数，true不修改表名，与数据库表名同步
    freezeTableName: true
  }
})

// similar for sync: you can define this to always force sync for models
sequelize.sync({
  force: false
})

Model.prototype.toJSON = function() {
  // https://github.com/sequelize/sequelize/issues/2132
  // Convert the instance to a JSON representation.Proxies to calling get with no keys.This means get all values gotten from the DB, and apply all custom getters.
  // toJSON用于序列化数据，拷贝原数据之后再执行操作
  // 这里把所有为null或者空的和更新删除时间删除
  let data = clone(this.get())
  unset(data, 'updatedtime')
  unset(data, 'deletedtime')

  if (isArray(this.exclude)) {
    this.exclude.forEach(value => {
      unset(data, value)
    })
  }
  // https://github.com/sequelize/sequelize/issues/10994
  // 转换日期格式
  data.datetime = moment(data.datetime).format('YYYY-MM-DD HH:mm:ss')
  // 为空的属性删除
  for (const key in data) {
    if (data[key] === null) {
      unset(data, key)
    }
  }
  // 拼接图片url路径
  if (data.smallavatar) {
    data.smallavatar =
      imgHost + 'yiyan' + data.smallavatar.substr(7).replace(/\\/g, '/')
  }
  if (data.picpath) {
    data.picpath =
      imgHost + 'yiyan' + data.picpath.substr(7).replace(/\\/g, '/')
  }
  if (data.musicurl) {
    data.musicurl =
      imgHost + 'yiyan' + data.musicurl.substr(7).replace(/\\/g, '/')
  }
  return data
}

module.exports = {
  sequelize
}
