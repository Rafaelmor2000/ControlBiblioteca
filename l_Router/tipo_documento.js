const express = require('express')
const router = express.Router()
const controller = require('../l_Service/tipo_documentoController')

router.get('/', controller.get);

module.exports = router