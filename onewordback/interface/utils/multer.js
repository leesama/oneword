// 定义图片上传配置
const { uploadPath } = require('../../dbs/config')
const multer = require('@koa/multer');
const storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, uploadPath)
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
const upload = multer({
  storage
});
module.exports = upload