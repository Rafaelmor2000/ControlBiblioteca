const bodyParser = require('body-parser');
const express = require('express');
const mySQL = require('mysql');

const pool = mySQL.createPool({
    connectionLimit: 10,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'sistemacontroldocumentos'
})

const app = express();
const port = process.env.PORT || 5000

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`))

app.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)

        connection.query('SELECT * from clasificacion', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from clasificacion table are: \n', rows)
        })
    })
})