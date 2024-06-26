const express = require('express')
const {check, validationResult} = require('express-validator')
const router = express.Router()
const edificioController = require('../l_Service/EdificioController')
const methodOverride = require('method-override');
var edificio = null

router.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

router.get('/', (req, res) => {
    let list = edificioController.get(function(list){
        res.render("edificio", {list: list, errors: ""})
    })
})

router.get('/nuevo', (req, res) => {
    edificioController.nuevo(function(list){
        res.render("newEdificio", {list: list, errors: ""})
    })
})

router.get('/getEdificiosByPlanta', (req,res) => {
    list = edificioController.getByPlanta(req.query.id, function(list){
        list = JSON.parse(JSON.stringify(list))
        res.send(list)
    })
})

router.post('/guardar', [
    check('nombre').notEmpty().withMessage('No se introdujo Nombre'),
    check('planta').notEmpty().withMessage('No se introdujo Planta'),
    ], (req,res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        edificioController.nuevo(function(list){
            res.render("newEdificio", {list: list, errors: errors.mapped()})
        })
    }
    else{
        edificioController.guardar(req.body)
        res.redirect('/sistemaControlDocumentos/edificio/')
    }
})

router.get('/editar', (req, res) => {
    let id = req.query.id
    plantas = new Promise((resolve) => {
        edificioController.nuevo(function(list){
            resolve(list)
        })
    })
    data = new Promise((resolve) => {
        edificioController.getById(id, function(ans){
            edificio = ans
            resolve(edificio)
        })
    })
    Promise.all([plantas, data]).then((values) => {
        res.render("editEdificio", {list: values[0], edificio: values[1], errors: ""})
    })
})

router.put('/:id', [
    check('nombre').notEmpty().withMessage('No se introdujo Nombre'),
    check('planta').notEmpty().withMessage('No se introdujo Planta'),
    ], (req,res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            plantas = new Promise((resolve) => {
                edificioController.nuevo(function(list){
                    resolve(list)
                })
            })
            plantas.then((values) => {
                res.render("editEdificio", {list: values, edificio: edificio, errors: errors.mapped()})
            })
        }
        else{
            edificio.nombre = req.body.nombre
            edificio.planta = req.body.planta
            console.log(edificio)
            edificioController.actualizar(edificio)
            edificio = null
            res.redirect('/sistemaControlDocumentos/edificio/')
        }
})

router.delete('/:id', (req, res) => {
    let id = req.params.id
    let nombre = req.query.nombre
    isDeleted = false
    edificioController.borrar(id, function(isDeleted){
        if(!isDeleted){
            let list = edificioController.get(function(list){
                res.render("edificio", {list: list, errors: `no se puede borrar el edificio "${nombre}" porque está siendo usado por alguna zona`})
            })
        }
        else{
            res.redirect("/sistemaControlDocumentos/edificio")
        }
    })
    
})


module.exports = router