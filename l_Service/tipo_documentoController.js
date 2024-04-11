const jquery = require('jquery')
const dataController = require('../l_DataAccess/tipo_documento')
const tipo_documento = require('../Utilities/tipo_documento')
module.exports = {
    get : (req, res) => {
        dataController.getAllTipo_documento(function(ans){
            let json = JSON.parse(JSON.stringify(ans))
            let list = []
            for (let key in json){
                let tipo = new tipo_documento(json[key].idTipo, json[key].nombre, json[key].nombreClasificacion)
                list.push(tipo)
            }
            console.log(list)
            res.send(list)
        })
    }

}