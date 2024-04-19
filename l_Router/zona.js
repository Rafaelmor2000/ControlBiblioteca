const express = require('express')
const router = express.Router()
const zonaController = require('../l_Service/zonaController')
const PlantaController = require('../l_Service/PlantaController')

router.get('/', (req, res) => {
    let list = zonaController.get(function(list){
        res.render("zona", {list: list})
    })
})

router.get('/nuevo', (req, res) => {
    let planta = req.query.planta
    let nombrePlanta = "Seleccionar"
    if (planta == undefined){
        planta = -1
        let ans = zonaController.nuevo(planta, function(ans){
            res.render("newZona", {nombrePlanta: nombrePlanta, plantaList: ans.plantaList, edificioList: ans.edificioList})
        })
    }
    else {
        nombrePlanta = PlantaController.getName(planta, function(nombrePlanta){
            let ans = zonaController.nuevo(planta, function(ans){
                res.render("newZona", {nombrePlanta: nombrePlanta, plantaList: ans.plantaList, edificioList: ans.edificioList})
            })
        })
    }
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