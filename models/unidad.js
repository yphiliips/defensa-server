class Unidades{
    constructor(id, alias, usuario, admin, ubicacion, enabled, estado, createdAt){
        this.id = id;
        this.alias = alias;
        this.usuario = usuario;
        this.admin = admin;
        this.ubicacion = ubicacion;
        this.enabled = enabled;
        this.estado = estado;
        this.createdAt = createdAt;
    }
}

module.exports = Unidades;