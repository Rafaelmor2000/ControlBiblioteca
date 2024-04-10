const dataController = require('../l_DataAccess/tipo_documento')
module.exports = {
    get : (req, res) => {
        const rows = dataController.getAllTipo_documento();
        console.log(rows)
        res.send(rows)

    }
}