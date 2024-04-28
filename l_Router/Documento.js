const express = require('express')
const router = express.Router()
const tipoController = require("../l_Service/tipo_documentoController")
const documentoController = require("../l_Service/DocumentoController")
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
    let ans = tipoController.get(function(ans){
        res.render("newDocumento", {tipo_documento: ans})
    })
})

router.post('/guardar', upload.single('file'), (req,res) => {
    if(req.body.nombre == "" || req.body.fecha == "" || req.body.tipo == -1){
        console.log("no se introdujo toda la informacion necesaria")

    }
    else{
        documento = new Documento (null, req.body.nombre, req.body.descripcion, req.body.fecha, req.body.tipo, null, null)
        if(req.file){
            fileData = JSON.parse(JSON.stringify(req.file))
            documento.setVir(fileData.path)

        }
        console.log(documento)
        documentoController.guardar(req.body)

    
        // let tipo = tipoController.getById(req.body.tipo, function(tipo){
        //     console.log("clasificacion " + tipo.clasificacion)
        // })
    }
})

router.post('/cancelar', (req,res) => {
    documento = null
})


module.exports = router