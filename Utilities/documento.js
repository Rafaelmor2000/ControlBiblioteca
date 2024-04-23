module.exports = class Documento {
    constructor (id, nombre, descripcion, fecha, tipo, dir_fis, dir_vir){
        this.id = id
        this.nombre = nombre
        this.descripcion = descripcion
        this.fecha = fecha
        this.tipo = tipo
        this.dir_fis = dir_fis
        this.dir_vir = dir_vir
    }

    setFis(dir_fis){
        this.dir_fis = dir_fis
    }

    setVir(dir_vir){
        this.dir_vir = dir_vir
    }
} 