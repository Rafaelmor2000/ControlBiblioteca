const express = require('express')
const router = express.Router()
const tipoController = require('../l_Service/tipo_documentoController')

router.get('/', tipoController.get)
router.get('/nuevo', tipoController.nuevo)
router.post('/guardar', tipoController.guardar)


module.exports = router