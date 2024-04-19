const express = require('express')
const router = express.Router()
const zonaController = require('../l_Service/zonaController')

router.get('/', (req, res) => {
    let list = zonaController.get(function(list){
        res.render("zona", {list: list})
    })
})

router.get('/nuevo', (req, res) => {
    let ans = zonaController.nuevo(function(ans){
        res.render("newZona", {plantaList: ans.plantaList, edificioList: ans.edificioList})
    })
})

router.get('/nuevo/:planta', (req, res) => {
    let ans = zonaController.nuevo(function(ans){
        res.render("newZona", {plantaList: ans.plantaList, edificioList: ans.edificioList})
    })
})

router.post('/guardar', (req,res) => {
    if(req.body.nombre == "" || req.body.edificio == undefined){
        console.log("no se introdujo toda la informacion necesaria")
        res.redirect('./nuevo')
    }
    else{
        zonaController.guardar(req.body)
        res.redirect('/sistemaControlDocumentos/edificio/')
    }
})


module.exports = router