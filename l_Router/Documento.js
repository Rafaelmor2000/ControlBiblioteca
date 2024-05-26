const express = require('express')
const {check, validationResult} = require('express-validator')
const router = express.Router()
const documentoController = require("../l_Service/DocumentoController")
const {upload} = require("../Utilities/multer")
const Documento = require("../Utilities/documento")
const methodOverride = require('method-override');

router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method;
        delete req.body._method;
        return method;
    } else if (req.query && '_method' in req.query) {
        // look in query parameters
        return req.query._method;
    }
}))

var documento = null

router.get('/', (req, res) => {
    documentoController.get(function(ans){
        res.render("documento", {list: ans})
    })
})

router.get('/nuevo', (req, res) => {
    documentoController.nuevo(function(data){
        res.render("newDocumento", {tipo_documento: data.tipos, plantaList: data.plantas, errors: ""})
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
        documentoController.nuevo(function(data){
            res.render("newDocumento", {tipo_documento: data.tipos, plantaList: data.plantas, errors: errors.mapped()})
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
        })
    })
})

router.put('/:id', 
    upload.single('file'),
    [
    check('nombre').notEmpty().withMessage('No se introdujo Nombre'),
    check('fecha').notEmpty().withMessage('No se introdujo Fecha'),
    ],
    (req, res) => {
    let id = req.params.id
    const errors = validationResult(req)
    console.log("something")
    if(!errors.isEmpty()){
        documentoController.getLists(documento, function(data){
            res.render("editDocumento", {documento: documento, seccion: data.seccion, seccionList: data.secciones, muebleList: data.muebles, zonaList: data.zonas, edificioList: data.edificios, plantaList: data.plantas, errors: errors.mapped()})
        })
    }
    else{
        const virPromise = new Promise((resolve) => {
            if(req.file){
                const fileData = JSON.parse(JSON.stringify(req.file))
                documento.setVir(fileData.path)
                resolve()
            }
            else{
                resolve()
            }
        })
        virPromise.then(() => {
            documento.setFis(req.body.seccion)
            documento.nombre = req.body.nombre
            documento.descripcion = req.body.descripcion, 
            documento.fecha = req.body.fecha,
            console.log(documento)
            documentoController.actualizar(documento)
            documento = null
        })
        res.redirect("/sistemaControlDocumentos")
    }
})

router.delete('/:id', (req, res) => {
    let id = req.params.id
    documentoController.borrar(id)
    res.redirect("/sistemaControlDocumentos")
})

module.exports = router