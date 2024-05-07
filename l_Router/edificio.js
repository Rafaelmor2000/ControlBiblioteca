const express = require('express')
const {check, validationResult} = require('express-validator')
const router = express.Router()
const edificioController = require('../l_Service/EdificioController')

router.get('/', (req, res) => {
    let list = edificioController.get(function(list){
        res.render("edificio", {list: list})
    })
})

router.get('/nuevo', (req, res) => {
    edificioController.nuevo(function(list){
        res.render("newEdificio", {list: list, errors: ""})
    })
})

router.get('/getEdificiosByPlanta', (req,res) => {
    list = edificioController.getByPlanta(req.query.id, function(list){
        list = JSON.parse(JSON.stringify(list))
        res.send(list)
    })
})

router.post('/guardar', [
    check('nombre').notEmpty().withMessage('No se introdujo Nombre'),
    check('planta').notEmpty().withMessage('No se introdujo Planta'),
    ], (req,res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        edificioController.nuevo(function(list){
            res.render("newEdificio", {list: list, errors: errors.mapped()})
        })
    }
    else{
        edificioController.guardar(req.body)
        res.redirect('/sistemaControlDocumentos/edificio/')
    }
})


module.exports = router