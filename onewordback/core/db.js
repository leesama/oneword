const Sequelize = require("sequelize")
const {
  dbName,
  host,
  port,
  user,
  password
} = require("../config/config1").database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: "mysql",
  host,
  port,
  logging: true,

  timezone: "+08:00",
  define: {
    //create_time  update_time delete_time
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    underscored: true,
    freezeTableName: true,
    // Scoping allows you to define commonly used queries that you can easily use later. Scopes can include all the same attributes as regular finders, where, include, limit etc.
    //  通过scopes可以在model中直接执行某些查询条件
    scopes: {
      bh: {
        attributes: {
          exclude: ["updated_at", "deleted_at", "created_at"]
        }
      }
    }
  }
})

sequelize.sync({
  force: false
})

module.exports = {
  sequelize
}
