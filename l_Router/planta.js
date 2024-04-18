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
    if(req.body.nombre == "" || req.body.ciudad == "" || req.body.estado == ""){
        console.log("no se introdujo toda la informacion necesaria")
        res.redirect('./nuevo')
    }
    else{
        plantaController.guardar(req.body)
        res.redirect('./')
    }
})


module.exports = router