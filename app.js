const bodyParser = require('body-parser');
const express = require('express');
const port = require('./Utilities/port')

const app = express();



app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set("view engine", "ejs")
app.set("views", "./l_Presentation/views")

app.listen(port, () => console.log(`Listening on port ${port.port}`))

const tipo_documento = require('./l_Router/tipo_documento')
app.use('/sistemaControlDocumentos/tipo_documento', tipo_documento)

const planta = require('./l_Router/planta')
app.use('/sistemaControlDocumentos/planta', planta)

const edificio = require('./l_Router/edificio')
app.use('/sistemaControlDocumentos/edificio', edificio)
