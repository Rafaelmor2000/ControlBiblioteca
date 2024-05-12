const {pool} = require("../Utilities/pool")

module.exports = {
    getListView : (callback) => {
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('SELECT seccion.idSeccion, seccion.nombre, mueble.nombre AS nombreMueble, zona.nombre AS nombreZona, edificio.nombre AS nombreEdificio, planta.nombre AS nombrePlanta \
                from seccion, mueble, zona, edificio, planta where seccion.idMueble = mueble.idMueble and mueble.zona = zona.idZona and zona.edificio = edificio.idEdificio and edificio.planta = planta.idPlanta', (err, rows) => {
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
                connection.query('SELECT * FROM seccion', (err, rows) => {
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

    getByMueble: (id, callback) =>{
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('SELECT * FROM seccion WHERE idMueble = ?', id, (err, rows) => {
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

    getData : (id, callback) => {
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('SELECT seccion.idSeccion, seccion.nombre, mueble.nombre AS nombreMueble, zona.nombre AS nombreZona, edificio.nombre AS nombreEdificio, planta.nombre AS nombrePlanta \
                from seccion, mueble, zona, edificio, planta where seccion.idSeccion = ? and seccion.idMueble = mueble.idMueble and mueble.zona = zona.idZona and zona.edificio = edificio.idEdificio \
                and edificio.planta = planta.idPlanta', id, (err, rows) => {
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
            const {idSeccion, nombre, idZona} = params
            connection.query('INSERT INTO seccion SET ?', params, (err, rows) => {
                connection.release()
                if (!err) {
                    console.log("exito guardando")
                } else {
                    console.log(err)
                }
            })
        })
    },

    deleteEntry : (id) => {
        pool.getConnection((err, connection) => {
            if(err) throw err
            connection.query('DELETE FROM seccion WHERE idSeccion = ?', id, (err, rows) => {
                connection.release()
                if (!err) {
                    console.log(`seccion con id ${id} ha sido eliminada`)
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
                connection.query('select * from documento where direccion_fisica = ?', id, (err, rows) => {
                    if (!err) {
                        if(rows.length != 0){
                            connection.release()
                            resolve(false)
                        }
                        else {
                            connection.query('DELETE FROM seccion WHERE idSeccion = ?', id, (err, rows) => {
                                connection.release()
                                if (!err) {
                                    console.log(`Seccion con id ${id} ha sido eliminada`)
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