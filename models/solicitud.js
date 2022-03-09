class Solicitud{
    constructor(id, admin, cliente, paquete, descripcion, ubicacion, conductor, estado, createdAt){
        this.id = id;
        this.admin = admin;
        this.cliente = cliente;
        this.paquete = paquete;
        this.descripcion = descripcion;
        this.ubicacion = ubicacion;
        this.conductor = conductor;
        this.estado = estado;
        this.createdAt = createdAt;
    }
}

module.exports = Solicitud;