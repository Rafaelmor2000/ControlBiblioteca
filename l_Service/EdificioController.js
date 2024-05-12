const dataController = require('../l_DataAccess/edificio')
const plantaController = require('../l_DataAccess/planta')
const Edificio = require('../Utilities/edificio')
const Planta = require('../Utilities/planta')



module.exports = {
    get : (callback) => {
        const dataPromise = new Promise((resolve) => {
            let list = []
            dataController.getListView(function(json){
                for (let key in json){
                    let tipo = new Edificio(json[key].idEdificio, json[key].nombre, json[key].nombrePlanta)
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
            plantaController.getList(function(json){
                for (let key in json){
                    let tipo = new Planta(json[key].idPlanta, json[key].nombre, json[key].ciudad, json[key].estado)
                    list.push(tipo)
                }
                resolve(list)
            })
        })
        dataPromise.then(list => {
            callback(list)
        })
    },

    getByPlanta : (id, callback) => {
        const dataPromise = new Promise((resolve) => {
            let list = []
            dataController.getByPlanta(id, function(json){
                if(id != -1){
                    for (let key in json){
                        let tipo = new Edificio(json[key].idEdificio, json[key].nombre, id)
                        list.push(tipo)
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