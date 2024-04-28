const express = require('express')
const router = express.Router()
const muebleController = require('../l_Service/MuebleController')

router.get('/', (req, res) => {
    let list = muebleController.get(function(list){
        res.render("mueble", {list: list})
    })
})

router.get('/nuevo', (req, res) => {
    let ans = muebleController.nuevo(function(ans){
        res.render("newMueble", {plantaList: ans})
    })
})

router.get('/getZonas', (req,res) => {
    let id = req.query.id
    let list = muebleController.getZonas(id, function(list){
        list = JSON.parse(JSON.stringify(list))
        res.send(list)
    })
})

router.get('/getEdificios', (req,res) => {
    let id = req.query.id
    let list = muebleController.getEdificios(id, function(list){
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
        let params = {nombre: req.body.nombre, zona: req.body.zona} 
        muebleController.guardar(params)
        res.redirect('/sistemaControlDocumentos/mueble/')
    }
})


module.exports = router