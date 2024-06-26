const express = require('express')
const {check, validationResult} = require('express-validator')
const router = express.Router()
const plantaController = require('../l_Service/PlantaController')
const methodOverride = require('method-override');

var planta = null

router.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

router.get('/', (req, res) => {
    let list = plantaController.get(function(list){
        res.render("planta", {list: list, errors: ""})
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

router.get('/editar', (req, res) => {
    let id = req.query.id
    plantaController.getById(id, function(ans){
        planta = ans
        res.render("editPlanta", {planta: planta, errors: ""})
    })
})

router.put('/:id', [
    check('nombre').notEmpty().withMessage('No se introdujo Nombre'),
    check('ciudad').notEmpty().withMessage('No se introdujo Ciudad'),
    check('estado').notEmpty().withMessage('No se introdujo Estado'),
    ], (req,res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            res.render("editPlanta", {planta: planta, errors : errors.mapped()})
        }
        else{
            if (planta){
                planta.nombre = req.body.nombre
                planta.ciudad = req.body.ciudad
                planta.estado = req.body.estado
                plantaController.actualizar(planta)
                planta = null
            }
            res.redirect('/sistemaControlDocumentos/planta/')
        }
})

router.delete('/:id', (req, res) => {
    let id = req.params.id
    let nombre = req.query.nombre
    isDeleted = false
    plantaController.borrar(id, function(isDeleted){
        if(!isDeleted){
            plantaController.get(function(list){
                res.render("planta", {list: list, errors: `no se puede borrar la planta "${nombre}" porque está siendo usado por algun edificio`})
            })
        }
        else{
            res.redirect("/sistemaControlDocumentos/planta")
        }
    })
})


module.exports = router