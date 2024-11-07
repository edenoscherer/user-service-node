module.exports = {
  "*.ts": [
    "eslint src/**/*.ts --fix",
    "npm run test:staged"
  ]
}
