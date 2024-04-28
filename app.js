const bodyParser = require('body-parser');
const express = require('express');
const port = require('./Utilities/port')
var path = require('path')

const app = express();



app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'))
app.set("view engine", "ejs")
app.set("views", "./l_Presentation/views")

app.listen(port, () => console.log(`Listening on port ${port.port}`))

const tipo_documento = require('./l_Router/tipo_documento')
app.use('/sistemaControlDocumentos/tipo_documento', tipo_documento)

const planta = require('./l_Router/planta')
app.use('/sistemaControlDocumentos/planta', planta)

const edificio = require('./l_Router/edificio')
app.use('/sistemaControlDocumentos/edificio', edificio)

const zona = require('./l_Router/zona')
app.use('/sistemaControlDocumentos/zona', zona)

const mueble = require('./l_Router/mueble')
app.use('/sistemaControlDocumentos/mueble', mueble)

const seccion = require('./l_Router/seccion')
app.use('/sistemaControlDocumentos/seccion', seccion)

const documento = require('./l_Router/Documento')
app.use('/sistemaControlDocumentos', documento)
