import express from 'express'
import db from '../models/index.js' // Importe l'objet db
const { Task } = db // Destructure Task depuis db
import { Op } from 'sequelize'
const router = express.Router()
// Récupérer toutes les tâches (avec filtres)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 25, titre, done, late } = req.query
    const where = {}
    if (titre) where.titre = { [Op.like]: `%${titre}%` }
    if (done !== undefined) where.done = done === 'true'
    if (late === 'true') where.datetime = { [Op.lt]: new Date() }
    else if (late === 'false') where.datetime = { [Op.gte]: new Date() }

    // Vérifie que Task est bien défini
    if (!Task) {
      throw new Error("Le modèle Task n'est pas défini.")
    }

    // findandcountall

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

router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      attributes: ['id', 'titre', 'description', 'done', 'datetime'],
    })
    if (!task) {
      return res.status(404).json({ error: 'La tâche est introuvable' })
    }
    res.status(200).json(task)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { titre, description, done = false, datetime } = req.body
    const task = await Task.create({ titre, description, done, datetime })
    res.status(201).json(task)
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const { titre, description, done, datetime } = req.body
    const [updatedRows] = await Task.update(
      { titre, description, done, datetime },
      { where: { id: req.params.id } },
    )
    if (updatedRows === 0) {
      return res.status(404).json({ error: 'La tâche est introuvable' })
    }
    const updatedTask = await Task.findByPk(req.params.id)
    res.status(200).json(updatedTask)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id)
    if (!task) {
      return res.status(404).json({ error: 'La tâche est introuvable' })
    }
    await task.destroy()
    res.status(200).json({ message: 'Tâche supprimée avec succès' })
  } catch (err) {
    next(err)
  }
})

export default router
