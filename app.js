import express from 'express'
import dotenv from 'dotenv'
import taskRoutes from './routes/tasks.js'
import db from './models/index.js'
dotenv.config()

const { sequelize } = db
const app = express()
const PORT = process.env.PORT || 3000

// Middleware pour parser le JSON
app.use(express.json())

//db.sequelize
//  .sync({ alter: true }) // Utilise { force: true } pour forcer la recréation (attention : supprime les données existantes !)
//  .then(() => {
//    console.log('Tables créées avec succès !')

// Routes
app.use('/tasks', taskRoutes)

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
})
//})
