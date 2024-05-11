const { data } = require('jquery')
const dataController = require('../l_DataAccess/documento')
const Documento = require("../Utilities/documento")

module.exports = {
    get : (callback) => {
        const dataPromise = new Promise((resolve) => {
            let list = []
            dataController.getListView(function(json){
                for (let key in json){
                    let fecha = new Date(json[key].fecha).toLocaleDateString()
                    let dir_vir = false
                    if(json[key].direccion_virtual){
                        dir_vir = true
                    }
                    let documento = new Documento(json[key].idDocumento, json[key].nombre, json[key].descripcion, fecha, json[key].tipo, json[key].direccion_fisica, dir_vir)
                    list.push(documento)
                }
                resolve(list)
            })
        })
        dataPromise.then(list => {
            callback(list)
        })
    },

    getByType : (id, callback) => {
        const dataPromise = new Promise((resolve) => {
            let list = []
            dataController.getByType(id, function(json){
                for (let key in json){
                    let fecha = new Date(json[key].fecha).toLocaleDateString()
                    let dir_vir = false
                    if(json[key].direccion_virtual){
                        dir_vir = true
                    }
                    let documento = new Documento(json[key].idDocumento, json[key].nombre, json[key].descripcion, fecha, json[key].tipo, json[key].direccion_fisica, dir_vir)
                    list.push(documento)
                }
                resolve(list)
            })
        })
        dataPromise.then(list => {
            callback(list)
        })
    },

    descargar : (id, callback) => {
        const dataPromise = new Promise((resolve) => {
            dataController.getDirVir(id, function(dir){
                console.log(dir)
                resolve(dir)
            })
        })
        dataPromise.then(dir => {
            callback(dir)
        })
    },


    guardar : (body) => {
        let params = JSON.parse(JSON.stringify(body))
        console.log(params)
        dataController.saveNew(params)
    },

    borrar : (id) => {
        dataController.deleteEntry(id)
    }
}