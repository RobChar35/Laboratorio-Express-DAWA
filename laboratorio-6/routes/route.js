const express = require('express')
let router = express.Router()

router.get('/', (req, res) => {
    res.render('portfolio/indexportfolio', {title: "Principal"})
})

router.get('/habilidades', (req, res) => {
    res.render('portfolio/habilidades', {title: "Habilidades"})
})

router.get('/contacto', (req, res) => {
    res.render('portfolio/contacto', {title: "Contacto"})
})

module.exports = router