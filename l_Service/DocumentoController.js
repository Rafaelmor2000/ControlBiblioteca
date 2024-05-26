const { data } = require('jquery')
const dataController = require('../l_DataAccess/documento')
const Documento = require("../Utilities/documento")
const plantaController = require('../l_Service/PlantaController')
const tipoController = require('../l_Service/tipo_documentoController')
const EdificioController = require('../l_Service/EdificioController')
const zonaController = require('../l_Service/zonaController')
const MuebleController = require('../l_Service/MuebleController')
const seccionController = require('../l_Service/SeccionController')

module.exports = {
    get : (callback) => {
        const dataPromise = new Promise((resolve) => {
            let list = []
            dataController.getListView(function(json){
                for (let key in json){
                    let fecha = new Date(json[key].fecha).toLocaleDateString()
                    let dir_vir = false
                    if(json[key].direccion_virtual){
                        dir_vir = true
                    }
                    let documento = new Documento(json[key].idDocumento, json[key].nombre, json[key].descripcion, fecha, json[key].tipo, json[key].direccion_fisica, dir_vir)
                    list.push(documento)
                }
                resolve(list)
            })
        })
        dataPromise.then(list => {
            callback(list)
        })
    },

    nuevo: (callback) => {
        tipoPromise = new Promise((resolve) => {
            tipoController.get(function(tipos){
                resolve(tipos)
            })
        })
        plantaPromise = new Promise((resolve) => {
            plantaController.get(function(plantas){
                resolve(plantas)
            })
        })
        Promise.all([tipoPromise, plantaPromise]).then((values) => {
            callback({tipos: values[0], plantas: values[1]})
        })
    },

    getLists : (documento, callback) => {
        let id = documento.direccion_fisica
        if(id != null){
            const dataPromise = new Promise((resolve) => {
                seccionController.getById(id, function(seccion){
                    resolve(seccion)
                })
            })
            dataPromise.then((seccion) => {
                let plantas = new Promise((resolve) => {
                    plantaController.get(function(plantaList){
                        resolve(plantaList)
                    })
                })
                let edificios = new Promise((resolve) => {
                    EdificioController.getByPlanta(seccion.planta, function(list){
                        resolve(list)
                    })
                })
                let zonas = new Promise((resolve) => {
                    zonaController.getByEdificio(seccion.edificio, function(list){
                        resolve(list)
                    })
                })
                let muebles = new Promise((resolve) => {
                    MuebleController.getByZona(seccion.zona, function(list){
                        resolve(list)
                    })
                })
                let secciones = new Promise((resolve) => {
                    seccionController.getByMueble(seccion.mueble, function(list){
                        resolve(list)
                    })
                })
                Promise.all([plantas, edificios, zonas, muebles, secciones]).then((values) => {
                    callback({seccion: seccion, plantas: values[0], edificios: values[1], zonas: values[2], muebles: values[3], secciones: values[4]})
                })
            })
        }
        else{
            let plantas = new Promise((resolve) => {
                plantaController.get(function(plantaList){
                    resolve(plantaList)
                })
            })
            plantas.then((plantaList) => {
                callback({seccion: null, plantas: plantaList, edificios: [], zonas: [], muebles: [], secciones: []})
            })
        }
    },

    getById : (id, callback) => {
        const dataPromise = new Promise((resolve) => {
            dataController.getById(id, function(json){
                let fecha = new Date(json[0].fecha).toISOString().split('T')[0]
                let dir_vir = false
                if(json[0].direccion_virtual){
                    dir_vir = true
                }
                let documento = new Documento(json[0].idDocumento, json[0].nombre, json[0].descripcion, fecha, json[0].tipo, json[0].direccion_fisica, dir_vir)
                
                resolve(documento)
            })
        })
        dataPromise.then(list => {
            callback(list)
        })
    },

    getByType : (id, callback) => {
        const dataPromise = new Promise((resolve) => {
            let list = []
            dataController.getByType(id, function(json){
                for (let key in json){
                    let fecha = new Date(json[key].fecha).toLocaleDateString()
                    let dir_vir = false
                    if(json[key].direccion_virtual){
                        dir_vir = true
                    }
                    let documento = new Documento(json[key].idDocumento, json[key].nombre, json[key].descripcion, fecha, json[key].tipo, json[key].direccion_fisica, dir_vir)
                    list.push(documento)
                }
                resolve(list)
            })
        })
        dataPromise.then(list => {
            callback(list)
        })
    },

    descargar : (id, callback) => {
        const dataPromise = new Promise((resolve) => {
            dataController.getDirVir(id, function(dir){
                console.log(dir)
                resolve(dir)
            })
        })
        dataPromise.then(dir => {
            callback(dir)
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

    borrar : (id) => {
        dataController.deleteEntry(id)
    }
}