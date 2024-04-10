const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`))

const tipo_documento = require('./l_Router/tipo_documento')
app.use('/tipo_documento', tipo_documento)