const express = require('express')
const {check, validationResult} = require('express-validator')
const router = express.Router()
const plantaController = require('../l_Service/PlantaController')

router.get('/', (req, res) => {
    let list = plantaController.get(function(list){
        res.render("planta", {list: list})
    })
})

router.get('/nuevo', (req, res) => {
    res.render("newPlanta", {errors: ''})
})

router.post('/guardar', [
    check('nombre').notEmpty().withMessage('No se introdujo Nombre'),
    check('ciudad').notEmpty().withMessage('No se introdujo Ciudad'),
    check('estado').notEmpty().withMessage('No se introdujo Estado'),
    ], (req,res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            res.render("newPlanta", {errors : errors.mapped()})
        }
        else{
            plantaController.guardar(req.body)
            res.redirect('/sistemaControlDocumentos/planta/')
        }
})


module.exports = router