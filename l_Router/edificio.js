const express = require('express')
const router = express.Router()
const edificioController = require('../l_Service/EdificioController')

router.get('/', (req, res) => {
    let list = edificioController.get(function(list){
        res.render("edificio", {list: list})
    })
})

router.get('/nuevo', (req, res) => {
    let list = edificioController.nuevo(function(list){
        res.render("newEdificio", {list: list})
    })
})

router.post('/guardar', (req,res) => {
    edificioController.guardar(req.body)
    res.redirect('./')
})


module.exports = router