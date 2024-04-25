let host = "http://192.168.31.25:3000/";
dbs = { port: "5432", password: "12345678" };
redis = { host: "localhost", port: "6379" };

module.exports = {
  host: host,
  dbs: {
    get dbName() {
      return "oneword";
    },
    get host() {
      return "localhost";
    },
    get port() {
      return dbs.port;
    },
    get user() {
      return "postgres";
    },
    get password() {
      return dbs.password;
    },
  },
  redis,
  uploadPath: "uploads/imgs/",
};
