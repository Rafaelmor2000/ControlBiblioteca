const dataController = require('../l_DataAccess/planta')
const Planta = require('../Utilities/planta')

module.exports = {
    get : (callback) => {
        const dataPromise = new Promise((resolve) => {
            let list = []
            dataController.getList(function(json){
                for (let key in json){
                    let planta = new Planta(json[key].idPlanta, json[key].nombre, json[key].ciudad, json[key].estado)
                    list.push(planta)
                }
                resolve(list)
            })
        })
        dataPromise.then(list => {
            callback(list)
        })
    },

    getName : (id, callback) => {
        const dataPromise = new Promise((resolve) => {
            dataController.getName(id, function(name){
                resolve(name)
            })
        })
        dataPromise.then(name => {
            callback(name)
        })
    },
    
    guardar : (body) => {
        let params = JSON.parse(JSON.stringify(body))
        console.log(params)
        dataController.saveNew(params)
    }
}