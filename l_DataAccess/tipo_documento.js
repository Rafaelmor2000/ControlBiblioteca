const {pool} = require("../Utilities/pool")
module.exports = {
    getTipoDisplayList : (callback) => {
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
                console.log('connected as id ' + connection.threadId)
                connection.query('SELECT tipodocumento.idTipo, tipodocumento.nombre, clasificacion.nombreClasificacion \
                                 FROM tipodocumento INNER JOIN clasificacion \
                                 ON tipodocumento.clasificacion = clasificacion.idClasificacion', (err, rows) => {
                    connection.release() // return the connection to pool
                    if (!err) {
                        resolve(rows)
                    } else {
                        reject(console.log(err))
                    }
                })
            })
        })
        dataPromise.then(rows => {
            let json = JSON.parse(JSON.stringify(rows))
            callback(json)
        })
    },
    getTipoRawList : (callback) => {
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
                console.log('connected as id ' + connection.threadId)
                connection.query('SELECT * FROM tipodocumento', (err, rows) => {
                    connection.release() // return the connection to pool
                    if (!err) {
                        resolve(rows)
                    } else {
                        reject(console.log(err))
                    }
                })
            })
        })
        dataPromise.then(rows => {
            let json = JSON.parse(JSON.stringify(rows))
            callback(json)
        })
    }
}