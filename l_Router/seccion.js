const express = require('express')
const router = express.Router()
const seccionController = require('../l_Service/SeccionController')

router.get('/', (req, res) => {
    let list = seccionController.get(function(list){
        res.render("seccion", {list: list})
    })
})

router.get('/nuevo', (req, res) => {
    let ans = seccionController.nuevo(function(ans){
        res.render("newSeccion", {plantaList: ans})
    })
})

router.get('/getMuebles', (req,res) => {
    let id = req.query.id
    let list = seccionController.getMuebles(id, function(list){
        list = JSON.parse(JSON.stringify(list))
        res.send(list)
    })
})

router.get('/getZonas', (req,res) => {
    let id = req.query.id
    let list = seccionController.getZonas(id, function(list){
        list = JSON.parse(JSON.stringify(list))
        res.send(list)
    })
})

router.get('/getEdificios', (req,res) => {
    let id = req.query.id
    let list = seccionController.getEdificios(id, function(list){
        list = JSON.parse(JSON.stringify(list))
        res.send(list)
    })
})

router.post('/guardar', (req,res) => {
    if(req.body.nombre == "" || req.body.zona == undefined){
        console.log("no se introdujo toda la informacion necesaria")
        console.log(req.body)
        res.redirect('./nuevo')
    }
    else{
        let params = {nombre: req.body.nombre, idMueble: req.body.mueble} 
        seccionController.guardar(params)
        res.redirect('/sistemaControlDocumentos/seccion/')
    }
})


module.exports = router