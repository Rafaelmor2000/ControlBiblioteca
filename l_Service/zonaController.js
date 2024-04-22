const dataController = require('../l_DataAccess/zona')
const edificioController = require('../l_DataAccess/edificio')
const plantaController = require('../l_DataAccess/planta')
const Zona = require("../Utilities/zona")
const Edificio = require('../Utilities/edificio')
const Planta = require('../Utilities/planta')
const edificio = require('../l_DataAccess/edificio')


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

    getEdificios : (id, callback) => {
        let edificioList = []
        const edificioPromise = new Promise((resolve) => {
            if(id != -1){
                edificioController.getByPlanta(id,function(json){
                    for (let key in json){
                        let tipo = new Edificio(json[key].idEdificio, json[key].nombre, id)
                        edificioList.push(tipo)
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

    guardar : (body) => {
        let params = JSON.parse(JSON.stringify(body))
        console.log(params)
        dataController.saveNew(params)
    }
}