const { sequelize } = require("../../core/db")
const { Sequelize, Model } = require("sequelize")

class Flow extends Model {}

Flow.init(
  {
    index: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
  },
  {
    sequelize,
    tableName: "flow"
  }
)

module.exports = {
  Flow
}
// flow表用于查询期刊
