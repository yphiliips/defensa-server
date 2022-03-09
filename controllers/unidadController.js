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

const addUnidad = async (req, res, next) => {
    try{
        const data = req.body;
        const docf = await getDoc(doc(firestore, "users", data.usuario));
        var us = {
            id: docf.id,
            usuario: docf.data().usuario,
            email: docf.data().email,
            phone: docf.data().phone
        };
        const docRef = await addDoc(collection(firestore, "unidades"), {
            alias: data.alias,
            usuario: us,
            admin: data.admin,
            ubicacion: {
                lat: 0,
                lng: 0
            },
            enabled: true,
            estado: 'habilitado',
            createdAt: new Date().getTime()
        });
        const docu = await getDoc(doc(firestore, "unidades", docRef.id));
        var us = new Unidad(
            docu.id,
            docu.data().alias,
            docu.data().usuario,
            docu.data().admin,
            docu.data().ubicacion,
            docu.data().enabled,
            docf.data().estado,
            docf.data().createdAt
        );
        res.send({
            ok: true,
            mensaje: 'Unidad Guardada.',
            usuario: us
        });
    } catch (error){
        res.send({
            ok: false,
            mensaje: error.message
        });
    }
}


module.exports = {
    addUnidad
}