const dataController = require('../l_DataAccess/edificio')
const plantaController = require('../l_Service/PlantaController')
const Edificio = require('../Utilities/edificio')


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
            plantaController.get(function(plantas){
                resolve(plantas)
            })
        })
        dataPromise.then(plantas => {
            callback(plantas)
        })
    },

    getById : (id, callback) => {
        const dataPromise = new Promise((resolve) => {
            let list = []
            dataController.getById(id, function(json){
                
                let edificio = new Edificio(json[0].idEdificio, json[0].nombre, json[0].planta)
                resolve(edificio)
            })
        })
        dataPromise.then(edificio => {
            callback(edificio)
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
    
    actualizar : (edificio) => {
        params = JSON.parse(JSON.stringify(edificio))
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