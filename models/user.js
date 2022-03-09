class User{
    constructor(id, usuario, email, phone, password, unidades, estado, createdAt){
        this.id = id;
        this.usuario = usuario;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.unidades = unidades;
        this.estado = estado;
        this.createdAt = createdAt;
    }
}

module.exports = User;