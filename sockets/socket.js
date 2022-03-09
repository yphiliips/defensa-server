const { io } = require('../index');
//Mensaje de Sockets
io.on('connection', client =>{
    console.log('cliente conectado');
    client.on('disconnect', ()=>{
        console.log('cliente desconectado');
    });
    client.on('mensaje', (payload)=>{
        console.log("Mensaje!!", payload);
        io.emit('mensaje',{admin: 'Nuevo Mensaje'});
    });
});