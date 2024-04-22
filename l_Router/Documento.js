const express = require('express')
const router = express.Router()
const tipoController = require("../l_Service/tipo_documentoController")

router.get('/', (req, res) => {
    res.send("get")
})

router.get('/nuevo', (req, res) => {
    let ans = tipoController.get(function(ans){
        res.render("newDocumento", {tipo_documento: ans})
    })
})

router.post('/guardar', (req,res) => {
    if(req.body.nombre == "" || req.body.fecha == undefined || req.body.tipo == undefined){
        console.log("no se introdujo toda la informacion necesaria")
        console.log(req.body)
        res.redirect('./nuevo')
    }
    else{
        console.log(req.body)
    }
})


module.exports = router