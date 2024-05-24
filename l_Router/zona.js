const express = require('express')
const {check, validationResult} = require('express-validator')
const router = express.Router()
const zonaController = require('../l_Service/zonaController')
const methodOverride = require('method-override');
var zona = null


router.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

router.get('/', (req, res) => {
    let list = zonaController.get(function(list){
        res.render("zona", {list: list, errors: ""})
    })
})

router.get('/nuevo', (req, res) => {
    let ans = zonaController.nuevo(function(ans){
        res.render("newZona", {plantaList: ans, errors: ""})
    })
})

router.get('/getZonasByEdificio', (req, res) => {
    id = req.query.id
    zonaController.getByEdificio(id, function(list){
        res.send(list)
    })
})

router.post('/guardar', [
    check('nombre').notEmpty().withMessage('No se introdujo Nombre'),
    check('edificio').notEmpty().withMessage('No se introdujo Edificio'),
], (req,res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        zonaController.nuevo(function(list){
            res.render("newZona", {plantaList: list, errors: errors.mapped()})
        })
    }
    else{
        let params = {nombre: req.body.nombre, edificio: req.body.edificio} 
        zonaController.guardar(params)
        res.redirect('/sistemaControlDocumentos/zona/')
    }
})

router.get('/editar', (req, res) => {
    let id = req.query.id
    zonaController.getById(id, function(ans){
        zona = ans
        zonaController.getLists(zona, function(data){
            res.render("editZona", {zona: zona, edificioList: data.edificios, plantaList: data.plantas, errors: ""})
        })
    })
})

router.put('/:id', [
    check('nombre').notEmpty().withMessage('No se introdujo Nombre'),
    check('edificio').notEmpty().withMessage('No se introdujo Edificio'),
    ], (req,res) => {
        const errors = validationResult(req);
        let id = req.params.id
        console.log(errors.mapped())
        if (!errors.isEmpty()){
            zonaController.getLists(zona, function(data){
                res.render("editZona", {zona: zona, edificioList: data.edificios, plantaList: data.plantas, errors: errors.mapped()})
            })
        }
        else{
            zona.nombre = req.body.nombre
            zona.edificio = req.body.edificio
            console.log(zona)
            zonaController.actualizar(zona)
            zona = null
            res.redirect('/sistemaControlDocumentos/zona/')
        }
})

router.delete('/:id', (req, res) => {
    let id = req.params.id
    let nombre = req.query.nombre
    isDeleted = false
    zonaController.borrar(id, function(isDeleted){
        if(!isDeleted){
            let list = zonaController.get(function(list){
                res.render("zona", {list: list, errors: `no se puede borrar la zona "${nombre}" porque está siendo usado por algún mueble`})
            })
        }
        else{
            res.redirect("/sistemaControlDocumentos/zona")
        }
    })
    
})


module.exports = router