const express = require('express')
const router = express.Router()
const tipoController = require('../l_Service/tipo_documentoController')

router.get('/', (req, res) => {
    let list = tipoController.get(function(list){
        res.render("tipoDocumento", {list: list})
    })
})

router.get('/nuevo', (req, res) => {
    let list = tipoController.nuevo(function(list){
        res.render("newTipoDocumento", {list: list})
    })
})

router.post('/guardar', (req,res) => {
    if(req.body.nombre == "" || req.body.clasificacion == undefined){
        console.log("no se introdujo toda la informacion necesaria")
        res.redirect('./nuevo')
    }
    else{ 
        tipoController.guardar(req.body)
        res.redirect('/sistemaControlDocumentos/tipo_documento/')
    }
})


module.exports = router