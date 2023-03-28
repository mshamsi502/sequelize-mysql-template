import { Sequelize } from "sequelize"
export const sequelize = new Sequelize("mshamsitest", "chadco", "chadko", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  operatorsAliases: false,
})
