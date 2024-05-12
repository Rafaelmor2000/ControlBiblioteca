const {pool} = require("../Utilities/pool")

module.exports = {
    getListView : (callback) => {
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('SELECT edificio.idEdificio, edificio.nombre, planta.nombre AS nombrePlanta from edificio, planta where edificio.planta = planta.idPlanta;', (err, rows) => {
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
                connection.query('SELECT * FROM edificio', (err, rows) => {
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

    getByPlanta: (id, callback) =>{
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('SELECT * FROM edificio WHERE planta = ?', id, (err, rows) => {
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
            const {idEdificio, nombre, planta} = params
            connection.query('INSERT INTO edificio SET ?', params, (err, rows) => {
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
                connection.query('select * from zona where edificio = ?', id, (err, rows) => {
                    if (!err) {
                        if(rows.length != 0){
                            connection.release()
                            resolve(false)
                        }
                        else {
                            connection.query('DELETE FROM edificio WHERE idEdificio = ?', id, (err, rows) => {
                                connection.release()
                                if (!err) {
                                    console.log(`Edificio con id ${id} ha sido eliminado`)
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