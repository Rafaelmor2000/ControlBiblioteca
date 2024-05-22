const dataController = require('../l_DataAccess/mueble')
const plantaController = require('../l_DataAccess/planta')
const Mueble = require("../Utilities/mueble")
const Planta = require('../Utilities/planta')
const zonaController = require('../l_Service/zonaController')
const edificioController = require('../l_Service/EdificioController')


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
            let plantaList = []
            plantaController.getList(function(json){
                for (let key in json){
                    let planta = new Planta(json[key].idPlanta, json[key].nombre, json[key].ciudad, json[key].estado)
                    plantaList.push(planta)
                }
                resolve(plantaList)
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