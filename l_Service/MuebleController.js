const dataController = require('../l_DataAccess/mueble')
const Mueble = require("../Utilities/mueble")
const zonaController = require('../l_Service/zonaController')
const edificioController = require('../l_Service/EdificioController')
const plantaController = require('../l_Service/PlantaController')


module.exports = {
    get : (callback) => {
        const dataPromise = new Promise((resolve) => {
            let list = []
            dataController.getListView(function(json){
                for (let key in json){
                    let tipo = new Mueble(json[key].idMueble, json[key].nombre, json[key].nombreZona, json[key].nombreEdificio, json[key].nombrePlanta)
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

    getByZona : (id, callback) => {
        const dataPromise = new Promise((resolve) => {
            let list = []
            dataController.getByZona(id, function(json){
                if(id != -1){
                    for (let key in json){
                        let zona = new Mueble(json[key].idMueble, json[key].nombre, id)
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

    getById : (id, callback) => {
        const dataPromise = new Promise((resolve) => {
            dataController.getById(id, function(json){
                let mueble = new Mueble(json[0].idMueble, json[0].nombre, json[0].zona, json[0].edificio, json[0].planta)
                resolve(mueble)
            })
        })
        dataPromise.then(list => {
            callback(list)
        })
    },

    getLists : (mueble, callback) => {
        let plantas = new Promise((resolve) => {
            plantaController.get(function(plantas){
                resolve(plantas)
            })
        })
        let edificios = new Promise((resolve) => {
            edificioController.getByPlanta(mueble.planta, function(list){
                resolve(list)
            })
        })
        let zonas = new Promise((resolve) => {
            zonaController.getByEdificio(mueble.edificio, function(list){
                resolve(list)
            })
        })
        Promise.all([plantas, edificios, zonas]).then((values) => {
            callback({plantas: values[0], edificios: values[1], zonas: values[2]})
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