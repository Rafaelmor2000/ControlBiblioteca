const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    console.log("get")
    })


router.get('/nuevo', (req, res) => {
    let ans = zonaController.nuevo(function(ans){
        res.render("newZona", {plantaList: ans})
    })
})

router.get('/getEdificios', (req,res) => {
    let id = req.query.id
    let list = zonaController.getEdificios(id, function(list){
        list = JSON.parse(JSON.stringify(list))
        res.send(list)
    })
})

router.post('/guardar', (req,res) => {
    if(req.body.nombre == "" || req.body.edificio == undefined){
        console.log("no se introdujo toda la informacion necesaria")
        console.log(req.body)
        res.redirect('./nuevo')
    }
    else{
        let params = {nombre: req.body.nombre, edificio: req.body.edificio} 
        zonaController.guardar(params)
        res.redirect('/sistemaControlDocumentos/zona/')
    }
})


module.exports = router