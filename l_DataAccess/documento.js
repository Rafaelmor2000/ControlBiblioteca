const {pool} = require("../Utilities/pool")

module.exports = {
    getListView: (callback) => {
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('SELECT documento.idDocumento, documento.nombre, documento.descripcion, documento.fecha, tipodocumento.nombre AS tipo, documento.direccion_fisica, documento.direccion_virtual\
                    FROM documento, tipodocumento where documento.tipo = tipodocumento.idTipo', (err, rows) => {
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

    getListRaw: (callback) => {
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('SELECT * FROM documento', (err, rows) => {
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

    getByType: (id, callback) =>{
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('SELECT * FROM documento WHERE tipo = ?', id, (err, rows) => {
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

    saveNew : (params) => {
        pool.getConnection((err, connection) => {
            if(err) throw err
            const {idDocumento, nombre, descripcion, fecha, tipo, direccion_fisica, direccion_virtual} = params
            connection.query('INSERT INTO documento SET ?', params, (err, rows) => {
                connection.release()
                if (!err) {
                    console.log("exito guardando")
                } else {
                    console.log(err)
                }
            })
        })
    }
}