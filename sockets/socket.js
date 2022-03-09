'use strict';

const firebase = require('../db');
const User = require('../models/user');
const Unidad = require('../models/unidad');
const Ubicacion = require('../models/ubicacion');
const { getFirestore,
        collection, 
        getDocs, 
        query, 
        where, 
        setDoc, 
        addDoc, 
        getDoc, 
        doc,
        Timestamp } = require('firebase/firestore');
const firestore = getFirestore(firebase);
const { io } = require('../index');
//Mensaje de Sockets
io.on('connection', client =>{
    console.log('cliente conectado');
    client.on('disconnect', ()=>{
        console.log('cliente desconectado');
    });
    client.on('setLocation', (payload)=>{
        console.log("setLocation!!", payload);
        // io.emit('mensaje',{admin: 'Nuevo Mensaje'});
    });
});