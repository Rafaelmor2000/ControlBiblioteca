const express = require('express')
const router = express.Router()
const tipoController = require("../l_Service/tipo_documentoController")
const Documento = require("../Utilities/documento")
const multer  = require('multer')
const upload = multer({ dest: '/uploads' })
var documento = null

router.get('/', (req, res) => {
    res.send("get")
})

router.get('/nuevo', (req, res) => {
    let ans = tipoController.get(function(ans){
        res.render("newDocumento", {tipo_documento: ans})
    })
})

router.post('/guardar', upload.single('file'), (req,res) => {
    console.log(req.body.file)

    if(req.body.nombre == "" || req.body.fecha == "" || req.body.tipo == -1){
        console.log("no se introdujo toda la informacion necesaria")

    }
    else{
        documento = new Documento (null, req.body.nombre, req.body.descripcion, req.body.fecha, req.body.tipo, null, null)
        console.log(documento)
    
        let tipo = tipoController.getById(req.body.tipo, function(tipo){
            console.log("clasificacion " + tipo.clasificacion)
        })
    }
    
})

router.post('/cancelar', (req,res) => {
    documento = null
})


module.exports = router