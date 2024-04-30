const dataController = require('../l_DataAccess/documento')
const Documento = require("../Utilities/documento")

module.exports = {
    get : (callback) => {
        const dataPromise = new Promise((resolve) => {
            let list = []
            dataController.getListView(function(json){
                for (let key in json){
                    let fecha = new Date(json[key].fecha).toLocaleDateString()
                    let documento = new Documento(json[key].idDocumento, json[key].nombre, json[key].descripcion, fecha, json[key].tipo, json[key].direccion_fisica, json[key].direccion_virtual)
                    list.push(documento)
                }
                resolve(list)
            })
        })
        dataPromise.then(list => {
            callback(list)
        })
    },


    guardar : (body) => {
        let params = JSON.parse(JSON.stringify(body))
        console.log(params)
        dataController.saveNew(params)
    }
}