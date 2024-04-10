const {pool} = require("../Utilities/pool")
module.exports = {
    getAllTipo_documento : () => {
        pool.getConnection((err, connection) => {
            if(err) throw err
            console.log('connected as id ' + connection.threadId)
            connection.query('SELECT tipodocumento.idTipo, tipodocumento.nombre, clasificacion.nombreClasificacion FROM tipodocumento INNER JOIN clasificacion ON tipodocumento.clasificacion = clasificacion.idClasificacion', (err, rows) => {
                connection.release() // return the connection to pool
                if (!err) {
                    console.log(rows)
                    return rows
                } else {
                    console.log(err)
                }
            })
        })
    }
}