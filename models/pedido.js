class Pedido{
    constructor(id, solicitud, estado, finishedAt, createdAt){
        this.id = id;
        this.solicitud = solicitud;
        this.estado = estado;
        this.finishedAt = finishedAt;
        this.createdAt = createdAt;
    }
}

module.exports = Pedido;