const dataController = require('../l_DataAccess/seccion')
const muebleController = require('../l_DataAccess/mueble')
const zonaController = require('../l_DataAccess/zona')
const edificioController = require('../l_DataAccess/edificio')
const plantaController = require('../l_DataAccess/planta')
const Seccion = require("../Utilities/seccion")
const Mueble = require("../Utilities/mueble")
const Zona = require("../Utilities/zona")
const Edificio = require('../Utilities/edificio')
const Planta = require('../Utilities/planta')


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

    getEdificios : (id, callback) => {
        let edificioList = []
        const edificioPromise = new Promise((resolve) => {
            if(id != -1){
                edificioController.getByPlanta(id,function(json){
                    for (let key in json){
                        let edificio = new Edificio(json[key].idEdificio, json[key].nombre, id)
                        edificioList.push(edificio)
                    }
                    resolve(edificioList)
                })
            }
            else{
                resolve(edificioList)
            }
        })
        edificioPromise.then((values) =>{
            callback(values)
        })
    },

    getZonas : (id, callback) => {
        let zonaList = []
        const zonaPromise = new Promise((resolve) => {
            if (id != -1){
                zonaController.getByEdificio(id, function(json){
                    for (let key in json){
                        let zona = new Zona(json[key].idZona, json[key].nombre, id)
                        zonaList.push(zona)
                    }
                    resolve(zonaList)
                })
            }
            else{
                resolve(zonaList)
            }
        })
        zonaPromise.then((zonaList) => {
            callback(zonaList)
        })
    },

    getMuebles : (id, callback) => {
        let muebleList = []
        const mueblePromise = new Promise((resolve) => {
            if (id != -1){
                muebleController.getByZona(id, function(json){
                    for (let key in json){
                        let mueble = new Mueble(json[key].idMueble, json[key].nombre, id)
                        muebleList.push(mueble)
                    }
                    resolve(muebleList)
                })
            }
            else{
                resolve(muebleList)
            }
        })
        mueblePromise.then((muebleList) => {
            callback(muebleList)
        })
    },

    guardar : (body) => {
        let params = JSON.parse(JSON.stringify(body))
        console.log(params)
        dataController.saveNew(params)
    }
}