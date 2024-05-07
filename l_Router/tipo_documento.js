const express = require('express')
const {check, validationResult} = require('express-validator')
const router = express.Router()
const tipoController = require('../l_Service/tipo_documentoController')

router.get('/', (req, res) => {
    let list = tipoController.get(function(list){
        res.render("tipoDocumento", {list: list})
    })
})

router.get('/nuevo', (req, res) => {
    let list = tipoController.nuevo(function(list){
        res.render("newTipoDocumento", {list: list, errors: ""})
    })
})

router.post('/guardar',[
    check('nombre').notEmpty().withMessage('No se introdujo Nombre'),
    check('clasificacion').notEmpty().withMessage('No se introdujo Clasificacion'),
], (req,res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        tipoController.nuevo(function(list){
            res.render("newTipoDocumento", {list: list, errors: errors.mapped()})
        })
    }
    else{ 
        tipoController.guardar(req.body)
        res.redirect('/sistemaControlDocumentos/tipo_documento/')
    }
})


module.exports = router