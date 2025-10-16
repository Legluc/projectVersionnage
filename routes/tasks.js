import express from 'express'
import db from '../models/index.js' // Importe l'objet db
const { Task } = db // Destructure Task depuis db
import { Op } from 'sequelize'
const router = express.Router()
// Récupérer toutes les tâches (avec filtres)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, titre, done, late } = req.query
    const where = {}
    if (titre) where.titre = { [Op.like]: `%${titre}%` }
    if (done !== undefined) where.done = done === 'true'
    if (late === 'true') where.datetime = { [Op.lt]: new Date() }
    else if (late === 'false') where.datetime = { [Op.gte]: new Date() }

    // Vérifie que Task est bien défini
    if (!Task) {
      throw new Error("Le modèle Task n'est pas défini.")
    }

    const tasks = await Task.findAll({
      where,
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [['datetime', 'ASC']],
    })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
export default router
