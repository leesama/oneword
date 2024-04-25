module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  rules: {
    "space-before-function-paren": ["error", "never"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    //关闭引号
    quotes: ["off", "single"],
    // Extra semicolon
    semi: ["off", "always"]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
