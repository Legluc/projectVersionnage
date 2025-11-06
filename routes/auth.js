const express = require('express')
const router = express.Router()
const validator = require('validator')
const { User } = require('../models/index.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function isValidEmail(email) {
  return validator.isEmail(email)
}

router.post('/register', async (req, res, next) => {
  try {
    const { email, password, confPass } = req.body
    if (confPass != password || String(password).length < 8) {
      res.status(403).json({ error: "le mot de passe n'est pas valide." })
    }
    if (!isValidEmail(email)) {
      res.status(403).json({ error: "L'adresse e-email n'est pas valide." })
    }
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(403).json({ error: 'Cette adresse e-mail est déjà utilisée.' })
    }
    const passCrypted = await bcrypt.hash(String(password), 12)
    const user = await User.create({
      email,
      password: passCrypted,
      role: 'client',
    })

    res.status(201).json({
      id: user.id,
      email: user.email,
      role: user.role,
      message: 'Compte créé avec succès.',
    })
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(403).json({ error: "L'e-mail ou le mot de passe n'est pas valide." })
    }

    const result = await bcrypt.compare(password, user.password)
    if (!result) {
      return res.status(403).json({ error: "L'e-mail ou le mot de passe n'est pas valide." })
    }

    const expiresIn = '1h'

    const jwtToken = jwt.sign({ userId: user.id, role: user.role }, process.env.KEY_TOKEN, {
      expiresIn,
    })

    res.status(200).json({ token: jwtToken })
  } catch (err) {
    next(err)
  }
})

module.exports = router
