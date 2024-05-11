const express = require('express')
const {check, validationResult} = require('express-validator')
const router = express.Router()
const tipoController = require('../l_Service/tipo_documentoController')
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
    let list = tipoController.get(function(list){
        res.render("tipoDocumento", {list: list, errors: ""})
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

router.delete('/:id', (req, res) => {
    let id = req.params.id
    let nombre = req.query.nombre
    isDeleted = false
    tipoController.borrar(id, function(isDeleted){
        if(!isDeleted){
            let list = tipoController.get(function(list){
                res.render("tipoDocumento", {list: list, errors: `no se puede borrar el tipo de dato "${nombre}" porque está siendo usado por algún documento`})
            })
        }
        else{
            res.redirect("/sistemaControlDocumentos/tipo_documento")
        }
    })
    
})


module.exports = router