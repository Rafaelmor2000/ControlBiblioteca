const express = require('express')
const router = express.Router()
const plantaController = require('../l_Service/PlantaController')

router.get('/', (req, res) => {
    let list = plantaController.get(function(list){
        res.render("planta", {list: list})
    })
})

router.get('/nuevo', (req, res) => {
    res.render("newPlanta")
})

router.post('/guardar', (req,res) => {
    plantaController.guardar(req.body)
    res.redirect('./')
})


module.exports = router