const env = require('../env')
let host, dbs, redis
if (env === 'dev') {
  host = 'http://192.168.1.2:3000/'
  dbs = { port: '5432', password: '' }
  redis = { host: 'localhost', port: '6379' }
} else if (env === 'prod') {
  host = 'https://www.sommerxt.com/'
  dbs = { host: 'localhost', port: '9307', password: '' }
  redis = {
    host: 'localhost',
    port: '9308',
    password: ''
  }
}

module.exports = {
  host: host,
  dbs: {
    get dbName() {
      return 'oneword'
    },
    get host() {
      return 'localhost'
    },
    get port() {
      return dbs.port
    },
    get user() {
      return 'postgres'
    },
    get password() {
      return dbs.password
    }
  },
  redis,
  uploadPath: 'uploads/imgs/'
}
