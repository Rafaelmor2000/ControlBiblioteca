const {pool} = require("../Utilities/pool")

module.exports = {
    getListView : (callback) => {
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('SELECT zona.idZona, zona.nombre, edificio.nombre AS nombreEdificio, planta.nombre AS nombrePlanta \
                from zona, edificio, planta where zona.edificio = edificio.idEdificio and edificio.planta = planta.idPlanta', (err, rows) => {
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
                connection.query('SELECT * FROM zona', (err, rows) => {
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

    getById: (id, callback) => {
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('SELECT zona.idZona, zona.nombre, edificio.idEdificio AS edificio, planta.idPlanta AS planta \
                from zona, edificio, planta where zona.edificio = edificio.idEdificio and edificio.planta = planta.idPlanta and zona.idZona = ?', id, (err, rows) => {
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

    getByEdificio: (id, callback) =>{
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('SELECT * FROM zona WHERE edificio = ?', id, (err, rows) => {
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
            const {idZona, nombre, edificio} = params
            connection.query('INSERT INTO zona SET ?', params, (err, rows) => {
                connection.release()
                if (!err) {
                    console.log("exito guardando")
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
                connection.query('select * from mueble where zona = ?', id, (err, rows) => {
                    if (!err) {
                        if(rows.length != 0){
                            connection.release()
                            resolve(false)
                        }
                        else {
                            connection.query('DELETE FROM zona WHERE idZona = ?', id, (err, rows) => {
                                connection.release()
                                if (!err) {
                                    console.log(`Zona con id ${id} ha sido eliminada`)
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