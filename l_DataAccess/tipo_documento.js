const {pool} = require("../Utilities/pool")

module.exports = {
    getTipoDisplayList : (callback) => {
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
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
    },

    getById : (id, callback) =>{
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('SELECT * FROM tipodocumento WHERE idTipo = ?', id, (err, rows) => {
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

    getClasificaciones : (callback) => {
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('SELECT * FROM clasificacion', (err, rows) => {
                    connection.release()
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
            const {nombre, clasificacion} = params
            connection.query('INSERT INTO tipodocumento SET ?', params, (err, rows) => {
                connection.release()
                if (!err) {
                    console.log("exito guardando")
                } else {
                    console.log(err)
                }
            })
        })
    },

    update : (params) => {
        pool.getConnection((err, connection) => {
            if(err) throw err
            const {id, nombre, clasificacion} = params
            connection.query('UPDATE tipodocumento SET nombre = ?, clasificacion = ? WHERE idTipo = ?', [nombre, clasificacion, id] , (err, rows) => {
                connection.release() // return the connection to pool

                if(!err) {
                    console.log(`Se ha actualizado el tipo de documento: ${nombre}`)
                } else {
                    console.log(err)
                }

            })
        })
    },

    deleteEntry : (id, callback) => {
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('select * from documento where tipo = ?', id, (err, rows) => {
                    if (!err) {
                        if(rows.length != 0){
                            connection.release()
                            resolve(false)
                        }
                        else {
                            connection.query('DELETE FROM tipoDocumento WHERE idTipo = ?', id, (err, rows) => {
                                connection.release()
                                if (!err) {
                                    console.log(`Tipo de documento con id ${id} ha sido eliminado`)
                                    resolve(true)
                                } else {
                                    reject(console.log(err))
                                }
                            })
                        }
                    } else {
                        reject(console.log(err))
                    }
                })
            })
        })
        dataPromise.then(isDeleted => {
            callback(isDeleted)
        })
    }
}