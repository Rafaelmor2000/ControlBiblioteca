const {pool} = require("../Utilities/pool")

module.exports = {
    getListView : (callback) => {
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('SELECT mueble.idMueble, mueble.nombre, zona.nombre AS nombreZona, edificio.nombre AS nombreEdificio, planta.nombre AS nombrePlanta \
                from mueble, zona, edificio, planta where mueble.zona = zona.idZona and zona.edificio = edificio.idEdificio and edificio.planta = planta.idPlanta', (err, rows) => {
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
                connection.query('SELECT * FROM mueble', (err, rows) => {
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

    getByZona: (id, callback) =>{
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('SELECT * FROM mueble WHERE zona = ?', id, (err, rows) => {
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
            const {idMueble, nombre, zona} = params
            connection.query('INSERT INTO mueble SET ?', params, (err, rows) => {
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
                connection.query('select * from seccion where idMueble = ?', id, (err, rows) => {
                    if (!err) {
                        if(rows.length != 0){
                            connection.release()
                            resolve(false)
                        }
                        else {
                            connection.query('DELETE FROM mueble WHERE idMueble = ?', id, (err, rows) => {
                                connection.release()
                                if (!err) {
                                    console.log(`Mueble con id ${id} ha sido eliminado`)
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