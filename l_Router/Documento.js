const express = require('express')
const router = express.Router()
const tipoController = require("../l_Service/tipo_documentoController")
const documentoController = require("../l_Service/DocumentoController")
const plantaController = require("../l_Service/PlantaController")
const {upload} = require("../Utilities/multer")
const Documento = require("../Utilities/documento")
const { json } = require('body-parser')

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
        res.render("newDocumento", {tipo_documento: values[0], plantaList: values[1]})
    })
})

router.post('/guardar', upload.single('file'), (req,res) => {
    if(req.body.nombre == "" || req.body.fecha == "" || req.body.tipo == -1){
        console.log("no se introdujo toda la informacion necesaria")

    }
    else{
        documento = new Documento (null, req.body.nombre, req.body.descripcion, req.body.fecha, req.body.tipo, null, null)
        var file = req.file
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
        });
        
        res.redirect("/sistemaControlDocumentos")

    
        // let tipo = tipoController.getById(req.body.tipo, function(tipo){
        //     console.log("clasificacion " + tipo.clasificacion)
        // })
    }
})

router.post('/cancelar', (req,res) => {
    documento = null
})


module.exports = router