const dataController = require('../l_DataAccess/zona')
const plantaController = require('../l_Service/PlantaController')
const edificioController = require('../l_Service/EdificioController')
const Zona = require("../Utilities/zona")


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
            dataController.getById(id, function(json){
                
                let zona = new Zona(json[0].idZona, json[0].nombre, json[0].edificio, json[0].planta)
                resolve(zona)
            })
        })
        dataPromise.then(zona => {
            callback(zona)
        })
    },

    getLists : (zona, callback) => {
        let plantas = new Promise((resolve) => {
            let plantaList = []
            plantaController.getList(function(json){
                for (let key in json){
                    let tipo = new Planta(json[key].idPlanta, json[key].nombre, json[key].ciudad, json[key].estado)
                    plantaList.push(tipo)
                }
                resolve(plantaList)
            })
        })
        let edificios = new Promise((resolve) => {
            edificioController.getByPlanta(zona.planta, function(list){
                console.log(list)
                resolve(list)
            })
        })
        Promise.all([plantas, edificios]).then((values) => {
            callback({plantas: values[0], edificios: values[1]})
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