const {pool} = require("../Utilities/pool")

module.exports = {
    getList : (callback) => {
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('SELECT * FROM Planta', (err, rows) => {
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

    getName : (id, callback) => {
        const dataPromise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('SELECT nombre FROM Planta where idPlanta = ?', id, (err, rows) => {
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
            callback(json[0].nombre)
        })
    },

    saveNew : (params) => {
        pool.getConnection((err, connection) => {
            if(err) throw err
            const {nombre, ciudad, estado} = params
            connection.query('INSERT INTO Planta SET ?', params, (err, rows) => {
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
            connection.query('DELETE FROM planta WHERE idPlanta = ?', id, (err, rows) => {
                connection.release()
                if (!err) {
                    console.log(`planta con id ${id} ha sido eliminada`)
                } else {
                    console.log(err)
                }
            })
        })
    }
}