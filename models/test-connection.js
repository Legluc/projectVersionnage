import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

// Charge les variables d'environnement
dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
)

sequelize
  .authenticate()
  .then(() => console.log('Connexion réussie !'))
  .catch((err) => console.error('Erreur de connexion :', err))
