const express = require('express')
const {check, validationResult} = require('express-validator')
const router = express.Router()
const seccionController = require('../l_Service/SeccionController')

router.get('/', (req, res) => {
    let list = seccionController.get(function(list){
        res.render("seccion", {list: list})
    })
})

router.get('/nuevo', (req, res) => {
    let ans = seccionController.nuevo(function(ans){
        res.render("newSeccion", {plantaList: ans, errors: ""})
    })
})

router.get('/getSeccionesByMueble', (req,res) => {
    id = req.query.id
    seccionController.getByMueble(id, function(list){
        res.send(list)
    })
})
router.get('/getSeccionData', (req,res) => {
    id = req.query.id
    seccionController.getData(id, function(data){
        res.send(data)
    })
})

router.post('/guardar', [
    check('nombre').notEmpty().withMessage('No se introdujo Nombre'),
    check('mueble').notEmpty().withMessage('No se introdujo Mueble'),
], (req,res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        seccionController.nuevo(function(list){
            res.render("newSeccion", {plantaList: list, errors: errors.mapped()})
        })
    }
    else{
        let params = {nombre: req.body.nombre, idMueble: req.body.mueble} 
        seccionController.guardar(params)
        res.redirect('/sistemaControlDocumentos/seccion/')
    }
})


module.exports = router