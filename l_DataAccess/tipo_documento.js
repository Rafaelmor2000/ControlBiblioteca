const {pool} = require("../Utilities/pool")
module.exports = {
    getAllTipo_documento : () => {
        pool.getConnection((err, connection) => {
            if(err) throw err
            console.log('connected as id ' + connection.threadId)
            connection.query('SELECT * from clasificacion', (err, rows) => {
                connection.release() // return the connection to pool
                if (!err) {
                    return rows
                } else {
                    console.log(err)
                }
            })
        })
    }
}