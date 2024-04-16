const jquery = require('jquery')
const dataController = require('../l_DataAccess/tipo_documento')
const tipo_documento = require('../Utilities/tipo_documento')
const clasificacion = require('../Utilities/clasificacion')
module.exports = {
    get : (req, res) => {
        dataController.getTipoDisplayList(function(json){
            let list = []
            for (let key in json){
                let tipo = new tipo_documento(json[key].idTipo, json[key].nombre, json[key].nombreClasificacion)
                list.push(tipo)
            }
            res.render("tipoDocumento", {list: list})
            //res.send(list)
        })
    },
    nuevo : (req, res) => {
        dataController.getClasificaciones(function(json){
            let list = []
            for (let key in json){
                let tipo = new clasificacion(json[key].idClasificacion, json[key].nombreClasificacion)
                list.push(tipo)
            }
            console.log(list)
            res.render("newTipoDocumento", {list: list})
        })
    },
    guardar : (req, res) => {
        console.log(req.body)
        res.send("tratando de guardar " + req.body.nombre)
    }
}