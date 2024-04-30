const dataController = require('../l_DataAccess/seccion')
const plantaController = require('../l_DataAccess/planta')
const Seccion = require("../Utilities/seccion")
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

    guardar : (body) => {
        let params = JSON.parse(JSON.stringify(body))
        console.log(params)
        dataController.saveNew(params)
    }
}