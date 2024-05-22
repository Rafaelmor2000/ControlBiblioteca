const express = require('express')
const {check, validationResult} = require('express-validator')
const router = express.Router()
const seccionController = require('../l_Service/SeccionController')
const methodOverride = require('method-override');

router.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

router.get('/', (req, res) => {
    let list = seccionController.get(function(list){
        res.render("seccion", {list: list, errors: ""})
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

router.get('/editar', (req, res) => {
    let id = req.query.id
    seccionController.getById(id, function(ans){
        seccion = ans
        seccionController.getLists(seccion, function(data){
            // res.render('editMueble', {seccion: seccion, muebleList: data.muebles, zonaList: data.zonas, edificioList: data.edificios, plantaList: data.plantas, errors: ""})
            res.render("editSeccion", {seccion: seccion, muebleList: data.muebles, zonaList: data.zonas, edificioList: data.edificios, plantaList: data.plantas, errors: ""})
        })
    })
})

router.delete('/:id', (req, res) => {
    let id = req.params.id
    let nombre = req.query.nombre
    isDeleted = false
    seccionController.borrar(id, function(isDeleted){
        if(!isDeleted){
            seccionController.get(function(list){
                res.render("seccion", {list: list, errors: `no se puede borrar la seccion "${nombre}" porque está siendo usado por algún documento`})
            })
        }
        else{
            res.redirect("/sistemaControlDocumentos/seccion")
        }
    })
    
})


module.exports = router