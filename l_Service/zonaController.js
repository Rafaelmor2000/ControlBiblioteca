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

    nuevo : (planta, callback) =>{
        var plantaList = []
        var edificioList = []
        const dataPromise = new Promise((resolve) => {
            plantaController.getList(function(json){
                for (let key in json){
                    let tipo = new Planta(json[key].idPlanta, json[key].nombre, json[key].ciudad, json[key].estado)
                    plantaList.push(tipo)
                }
                resolve(plantaList)
            })
        })
        const edificioPromise = new Promise((resolve) => {
            if(planta != -1){
                edificioController.getByPlanta(planta,function(json){
                    for (let key in json){
                        let tipo = new Edificio(json[key].idEdificio, json[key].nombre, planta)
                        edificioList.push(tipo)
                    }
                    resolve(edificioList)
                })
            }
            else{
                resolve(edificioList)
            }
        })
        Promise.all([dataPromise, edificioPromise]).then((values) => {
            callback({plantaList: values[0], edificioList: values[1]})
        })
    },

    guardar : (body) => {
        let params = JSON.parse(JSON.stringify(body))
        console.log(params)
        dataController.saveNew(params)
    }
}