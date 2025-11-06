import fs from 'fs'
import path from 'path'
import { Sequelize } from 'sequelize'
import process from 'process'
import * as url from 'url'
import dotenv from 'dotenv'
import TaskModel from './Task.js'

// Charge les variables d'environnement
dotenv.config()

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const db = {}

// Initialise Sequelize avec les variables d'environnement
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
)

// Charge les modèles
const Task = TaskModel(sequelize, Sequelize.DataTypes)

// Associe les modèles si nécessaire
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.Task = Task
db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
