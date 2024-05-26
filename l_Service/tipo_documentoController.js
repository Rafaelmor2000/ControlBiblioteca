const dataController = require('../l_DataAccess/tipo_documento')
const tipo_documento = require('../Utilities/tipo_documento')
const clasificacion = require('../Utilities/clasificacion')

module.exports = {
    get : (callback) => {
        const dataPromise = new Promise((resolve) => {
            let list = []
            dataController.getTipoDisplayList(function(json){
                for (let key in json){
                    let tipo = new tipo_documento(json[key].idTipo, json[key].nombre, json[key].nombreClasificacion)
                    list.push(tipo)
                }
                resolve(list)
            })
        })
        dataPromise.then(list => {
            callback(list)
        })
    },

    nuevo : (callback) =>{
        const dataPromise = new Promise((resolve) => {
            let list = []
            dataController.getClasificaciones(function(json){
                for (let key in json){
                    let tipo = new clasificacion(json[key].idClasificacion, json[key].nombreClasificacion)
                    list.push(tipo)
                }
                resolve(list)
            })
        })
        dataPromise.then(list => {
            callback(list)
        })
    },

    getById : (id, callback) => {
        const dataPromise = new Promise((resolve) => {
            let tipo
            dataController.getById(id, function(json){
                tipo = new tipo_documento(json[0].idTipo, json[0].nombre, json[0].clasificacion)
                resolve(tipo)
            })
        })
        dataPromise.then(tipo => {
            callback(tipo)
        })
    },

    guardar : (body) => {
        let params = JSON.parse(JSON.stringify(body))
        console.log(params)
        dataController.saveNew(params)
    },

    actualizar : (tipo) => {
        params = JSON.parse(JSON.stringify(tipo))
        dataController.update(params)
    },

    borrar : (id, callback) => {
        const dataPromise = new Promise((resolve) => {
            dataController.deleteEntry(id, function(isDeleted){
                resolve(isDeleted)
            })
        })
        dataPromise.then(isDeleted => {
            callback(isDeleted)
        })
    }
}