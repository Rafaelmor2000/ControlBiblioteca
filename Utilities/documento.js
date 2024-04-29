module.exports = class Documento {
    constructor (id, nombre, descripcion, fecha, tipo, dir_fis, dir_vir){
        this.idDocumento = id
        this.nombre = nombre
        this.descripcion = descripcion
        this.fecha = fecha
        this.tipo = tipo
        this.direccion_fisica = dir_fis
        this.direccion_virtual = dir_vir
    }
    getDescripcion(){
        return this.descripcion
    }

    setFis(dir_fis){
        this.direccion_fisica = dir_fis
    }

    setVir(dir_vir){
        this.direccion_virtual = dir_vir
    }
} 