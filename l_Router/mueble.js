const express = require('express')
const {check, validationResult} = require('express-validator')
const router = express.Router()
const muebleController = require('../l_Service/MuebleController')

router.get('/', (req, res) => {
    let list = muebleController.get(function(list){
        res.render("mueble", {list: list})
    })
})

router.get('/nuevo', (req, res) => {
    let ans = muebleController.nuevo(function(ans){
        res.render("newMueble", {plantaList: ans, errors: ""})
    })
})

router.get('/getMueblesByZona', (req,res) => {
    id = req.query.id
    muebleController.getByZona(id, function(list){
        res.send(list)
    })
})

router.post('/guardar', [
    check('nombre').notEmpty().withMessage('No se introdujo Nombre'),
    check('zona').notEmpty().withMessage('No se introdujo Zona'),
], (req,res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        muebleController.nuevo(function(list){
            res.render("newMueble", {plantaList: list, errors: errors.mapped()})
        })
    }

    else{
        let params = {nombre: req.body.nombre, zona: req.body.zona} 
        muebleController.guardar(params)
        res.redirect('/sistemaControlDocumentos/mueble/')
    }
})


module.exports = router