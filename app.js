const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set("view engine", "ejs")
app.set("views", "./l_Presentation/views")

app.listen(port, () => console.log(`Listening on port ${port}`))

const tipo_documento = require('./l_Router/tipo_documento')
app.use('/sistemaControlDocumentos', tipo_documento)