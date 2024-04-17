const express = require('express')
const router = express.Router()
const tipoController = require('../l_Service/tipo_documentoController')
const { data } = require('jquery')

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
    tipoController.guardar(req.body)
    res.redirect('./')
})


module.exports = router