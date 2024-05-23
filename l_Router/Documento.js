const express = require('express')
const {check, validationResult} = require('express-validator')
const router = express.Router()
const tipoController = require("../l_Service/tipo_documentoController")
const documentoController = require("../l_Service/DocumentoController")
const plantaController = require("../l_Service/PlantaController")
const {upload} = require("../Utilities/multer")
const Documento = require("../Utilities/documento")
const { json } = require('body-parser')
const methodOverride = require('method-override');

router.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

var documento = null

router.get('/', (req, res) => {
    let ans = documentoController.get(function(ans){
        res.render("documento", {list: ans})
    })
})

router.get('/nuevo', (req, res) => {
    tipoPromise = new Promise((resolve) => {
        tipoController.get(function(tipos){
            resolve(tipos)
        })
    })
    plantaPromise = new Promise((resolve) => {
        plantaController.get(function(plantas){
            resolve(plantas)
        })
    })
    Promise.all([tipoPromise, plantaPromise]).then((values) => {
        res.render("newDocumento", {tipo_documento: values[0], plantaList: values[1], errors: ""})
    })
})

  
router.get('/descargarArchivo', (req, res) => { 
    let id = req.query.id
    documentoController.descargar(id, function(file){
        res.download(file);
    })
})

router.post('/guardar',
    upload.single('file'),
    [
    check('nombre').notEmpty().withMessage('No se introdujo Nombre'),
    check('tipo').isInt({min: 0}).withMessage('Seleccion de tipo inválida'),
    check('fecha').notEmpty().withMessage('No se introdujo Fecha'),
    ],
    (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        tipoPromise = new Promise((resolve) => {
            tipoController.get(function(tipos){
                resolve(tipos)
            })
        })
        plantaPromise = new Promise((resolve) => {
            plantaController.get(function(plantas){
                resolve(plantas)
            })
        })
        Promise.all([tipoPromise, plantaPromise]).then((values) => {
            res.render("newDocumento", {tipo_documento: values[0], plantaList: values[1], errors: errors.mapped()})
        })

    }
    else{
        documento = new Documento (null, req.body.nombre, req.body.descripcion, req.body.fecha, req.body.tipo, null, null)
        virPromise = new Promise((resolve) => {
            if(req.file){
                fileData = JSON.parse(JSON.stringify(req.file))
                documento.setVir(fileData.path)
                resolve()
            }
            else{
                resolve()
            }
        })
        fisPromise = new Promise((resolve) => {
            if(req.body.seccion){
                documento.setFis(req.body.seccion)
                resolve()
            }
            else{
                resolve()
            }
        })

        Promise.all([virPromise, fisPromise]).then(() => {
            console.log(documento)
            documentoController.guardar(documento)
            documento = null
        });
        
        res.redirect("/sistemaControlDocumentos")
    }
})

router.get('/editar', (req, res) => {
    let id = req.query.id
    documentoController.getById(id, function(ans){
        documento = ans
        documentoController.getLists(documento, function(data){
            res.render("editDocumento", {documento: documento, seccion: data.seccion, seccionList: data.secciones, muebleList: data.muebles, zonaList: data.zonas, edificioList: data.edificios, plantaList: data.plantas, errors: ""})
            //res.render("editSeccion", {seccion: seccion, muebleList: data.muebles, zonaList: data.zonas, edificioList: data.edificios, plantaList: data.plantas, errors: ""})
        })
    })
})

router.delete('/:id', (req, res) => {
    let id = req.params.id
    documentoController.borrar(id)
    res.redirect("/sistemaControlDocumentos")
})

module.exports = router