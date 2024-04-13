const express = require('express')
const router = express.Router()
const tipoController = require('../l_Service/tipo_documentoController')

router.get('/tipo_documento', tipoController.get)

module.exports = router