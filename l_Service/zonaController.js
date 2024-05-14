const dataController = require('../l_DataAccess/zona')
const plantaController = require('../l_DataAccess/planta')
const Zona = require("../Utilities/zona")
const Planta = require('../Utilities/planta')


module.exports = {
    get : (callback) => {
        const dataPromise = new Promise((resolve) => {
            let list = []
            dataController.getListView(function(json){
                for (let key in json){
                    let tipo = new Zona(json[key].idZona, json[key].nombre, json[key].nombreEdificio, json[key].nombrePlanta)
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
        var plantaList = []
        const dataPromise = new Promise((resolve) => {
            plantaController.getList(function(json){
                for (let key in json){
                    let tipo = new Planta(json[key].idPlanta, json[key].nombre, json[key].ciudad, json[key].estado)
                    plantaList.push(tipo)
                }
                resolve(plantaList)
            })
        })
        dataPromise.then((values) => {
            callback(values)
        })
    },

    getByEdificio : (id, callback) => {
        const dataPromise = new Promise((resolve) => {
            let list = []
            dataController.getByEdificio(id, function(json){
                if(id != -1){
                    for (let key in json){
                        let zona = new Zona(json[key].idZona, json[key].nombre, id)
                        list.push(zona)
                    }
                    resolve(list)
                }
                else{
                    resolve(list)
                }
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