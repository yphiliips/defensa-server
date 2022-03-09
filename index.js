'use strict';
const express = require('express');
const cors = require('cors');
const bodyparse = require('body-parser');
const path = require('path');
const config = require('./config');
//APP de Express
const app = express();
//Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
const userRoutes = require('./routes/user-routes');
const unidadRoutes = require('./routes/unidades-routes');

require('./sockets/socket');
const publicPath = path.resolve( __dirname, 'public' );

app.use( express.static(publicPath) );
app.use( express.json() );
app.use( cors() );
app.use( bodyparse.json() );

app.use('/api', userRoutes.routes);
app.use('/api', unidadRoutes.routes);

// app.listen(config.port, () => {
//     console.log('APP is listening on port:'+config.port);
// });

server.listen(config.port, (err)=>{
    if(err) throw new Error(err);
    console.log(`servidor corriendo en puerto!!!`, config.port);
});