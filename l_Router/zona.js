const express = require('express')
const {check, validationResult} = require('express-validator')
const router = express.Router()
const zonaController = require('../l_Service/zonaController')

router.get('/', (req, res) => {
    let list = zonaController.get(function(list){
        res.render("zona", {list: list})
    })
})

router.get('/nuevo', (req, res) => {
    let ans = zonaController.nuevo(function(ans){
        res.render("newZona", {plantaList: ans, errors: ""})
    })
})

router.get('/getZonasByEdificio', (req, res) => {
    id = req.query.id
    zonaController.getByEdificio(id, function(list){
        res.send(list)
    })
})

router.post('/guardar', [
    check('nombre').notEmpty().withMessage('No se introdujo Nombre'),
    check('edificio').notEmpty().withMessage('No se introdujo Edificio'),
], (req,res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        zonaController.nuevo(function(list){
            res.render("newZona", {plantaList: list, errors: errors.mapped()})
        })
    }
    else{
        let params = {nombre: req.body.nombre, edificio: req.body.edificio} 
        zonaController.guardar(params)
        res.redirect('/sistemaControlDocumentos/zona/')
    }
})


module.exports = router