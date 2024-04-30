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
    let ans = zonaController.nuevo(function(ans){
        res.render("newZona", {plantaList: ans})
    })
})

router.get('/getZonasByEdificio', (req, res) => {
    id = req.query.id
    zonaController.getByEdificio(id, function(list){
        res.send(list)
    })
})

router.post('/guardar', (req,res) => {
    if(req.body.nombre == "" || req.body.edificio == undefined){
        console.log("no se introdujo toda la informacion necesaria")
        console.log(req.body)
        res.redirect('./nuevo')
    }
    else{
        let params = {nombre: req.body.nombre, edificio: req.body.edificio} 
        zonaController.guardar(params)
        res.redirect('/sistemaControlDocumentos/zona/')
    }
})


module.exports = router