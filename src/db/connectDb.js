const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('koyebdb', 'koyeb-adm', 'jRPsM1TYH7cS', {
  host: 'ep-summer-silence-56907643.eu-central-1.aws.neon.tech',
  dialect: "postgres",
  dialectOptions:{
    ssl:"required"
  } /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

const connectDb = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

module.exports = connectDb
