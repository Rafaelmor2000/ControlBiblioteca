const dataController = require('../l_DataAccess/seccion')

const Seccion = require("../Utilities/seccion")
const zonaController = require('../l_Service/zonaController')
const plantaController = require('../l_Service/PlantaController')
const edificioController = require('../l_Service/EdificioController')
const muebleController = require('../l_Service/MuebleController')


module.exports = {
    get : (callback) => {
        const dataPromise = new Promise((resolve) => {
            let list = []
            dataController.getListView(function(json){
                for (let key in json){
                    let tipo = new Seccion(json[key].idSeccion, json[key].nombre, json[key].nombreMueble, json[key].nombreZona, json[key].nombreEdificio, json[key].nombrePlanta)
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

    getByMueble : (id, callback) =>{
        const dataPromise = new Promise((resolve) => {
            let list = []
            dataController.getByMueble(id, function(json){
                if(id != -1){
                    for (let key in json){
                        let seccion = new Seccion(json[key].idSeccion, json[key].nombre, id)
                        list.push(seccion)
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

    getData : (id, callback) => {
        const dataPromise = new Promise((resolve) => {
            dataController.getData(id, function(json){
                let seccion = new Seccion(json[0].idSeccion, json[0].nombre, json[0].nombreMueble, json[0].nombreZona, json[0].nombreEdificio, json[0].nombrePlanta)
                resolve(seccion)
            })
        })
        dataPromise.then(seccion => {
            callback(seccion)
        })
    },

    getById : (id, callback) => {
        const dataPromise = new Promise((resolve) => {
            dataController.getById(id, function(json){
                let seccion = new Seccion(json[0].idSeccion, json[0].nombre, json[0].mueble, json[0].zona, json[0].edificio, json[0].planta)
                resolve(seccion)
            })
        })
        dataPromise.then(seccion => {
            callback(seccion)
        })
    },

    getLists : (seccion, callback) => {
        const plantas = new Promise((resolve) => {
            plantaController.get(function(plantas){
                resolve(plantas)
            })
        })
        let edificios = new Promise((resolve) => {
            edificioController.getByPlanta(seccion.planta, function(list){
                resolve(list)
            })
        })
        let zonas = new Promise((resolve) => {
            zonaController.getByEdificio(seccion.edificio, function(list){
                resolve(list)
            })
        })
        let muebles = new Promise((resolve) => {
            muebleController.getByZona(seccion.zona, function(list){
                resolve(list)
            })
        })
        Promise.all([plantas, edificios, zonas, muebles]).then((values) => {
            callback({plantas: values[0], edificios: values[1], zonas: values[2], muebles: values[3]})
        })
    },

    guardar : (body) => {
        let params = JSON.parse(JSON.stringify(body))
        console.log(params)
        dataController.saveNew(params)
    },

    actualizar : (seccion) => {
        params = JSON.parse(JSON.stringify(seccion))
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