const express = require('express')
const {check, validationResult} = require('express-validator')
const router = express.Router()
const muebleController = require('../l_Service/MuebleController')
const methodOverride = require('method-override');
var mueble = null

router.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

router.get('/', (req, res) => {
    let list = muebleController.get(function(list){
        res.render("mueble", {list: list, errors: ""})
    })
})

router.get('/nuevo', (req, res) => {
    let ans = muebleController.nuevo(function(ans){
        res.render("newMueble", {plantaList: ans, errors: ""})
    })
})

router.get('/getMueblesByZona', (req,res) => {
    id = req.query.id
    muebleController.getByZona(id, function(list){
        res.send(list)
    })
})

router.post('/guardar', [
    check('nombre').notEmpty().withMessage('No se introdujo Nombre'),
    check('zona').notEmpty().withMessage('No se introdujo Zona'),
], (req,res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        muebleController.nuevo(function(list){
            res.render("newMueble", {plantaList: list, errors: errors.mapped()})
        })
    }

    else{
        let params = {nombre: req.body.nombre, zona: req.body.zona} 
        muebleController.guardar(params)
        res.redirect('/sistemaControlDocumentos/mueble/')
    }
})

router.get('/editar', (req, res) => {
    let id = req.query.id
    muebleController.getById(id, function(ans){
        mueble = ans
        muebleController.getLists(mueble, function(data){
            res.render('editMueble', {mueble: mueble, zonaList: data.zonas, edificioList: data.edificios, plantaList: data.plantas, errors: ""})
        })
    })
})

router.put('/:id', [
    check('nombre').notEmpty().withMessage('No se introdujo Nombre'),
    check('zona').notEmpty().withMessage('No se introdujo Zona'),
    ], (req,res) => {
        const errors = validationResult(req);
        console.log(errors.mapped())
        if (!errors.isEmpty()){
            muebleController.getLists(mueble, function(data){
                res.render('editMueble', {mueble: mueble, zonaList: data.zonas, edificioList: data.edificios, plantaList: data.plantas, errors: errors.mapped()})
            })
        }
        else{
            mueble.nombre = req.body.nombre
            mueble.zona = req.body.zona
            console.log(mueble)
            muebleController.actualizar(mueble)
            mueble = null
            res.redirect('/sistemaControlDocumentos/mueble/')
        }
})

router.delete('/:id', (req, res) => {
    let id = req.params.id
    let nombre = req.query.nombre
    isDeleted = false
    muebleController.borrar(id, function(isDeleted){
        if(!isDeleted){
            muebleController.get(function(list){
                res.render("mueble", {list: list, errors: `no se puede borrar el mueble "${nombre}" porque está siendo usada por alguna sección`})
            })
        }
        else{
            res.redirect("/sistemaControlDocumentos/mueble")
        }
    })
    
})


module.exports = router