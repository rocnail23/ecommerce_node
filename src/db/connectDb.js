const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('railway', 'postgres', '*gcGca34ee*GGGFFBabBbccd1fF-bE1g', {
  dialect: 'postgres', // Reemplaza 'mysql' con el dialecto de tu base de datos
  host: 'viaduct.proxy.rlwy.net',
  port: 23138,
  dialectOptions: {
    // Opciones específicas del proxy si es necesario
    // Ejemplo:
    // ssl: true,
    // rejectUnauthorized: false,
  },
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
