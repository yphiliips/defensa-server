'use strict';

const firebase = require('../db');
const uniqid = require('uniqid');
const bcrypt = require('bcrypt');
const User = require('../models/user');
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

const loginUser = async (req, res, next) => {
    try{
        const data = req.body;
        res.send({
            ok: true,
            mensaje: 'Usuario Logueado.',
            user: data.email
        });
        const userList = await getDocs(query(collection(firestore, 'users'), where('email', '==', data.email)));
        const usersArray = [];
        userList.forEach(doc => {
            const user = new User(
                doc.id,
                doc.data().usuario,
                doc.data().email,
                doc.data().phone,
                doc.data().password,
                doc.data().unidades,
                doc.data().estado,
                doc.data().createdAt
            );
            usersArray.push(user);
        });
        if(usersArray.length!=0){
            var user = usersArray[0];
            if(bcrypt.compareSync(data.password, user.password)){
                res.send({
                    ok: true,
                    mensaje: 'Usuario Logueado.',
                    user: user
                });
            } else {
                res.send({
                    ok: false,
                    mensaje: 'Contraseña equivocada.'
                });
            }
            
        }else{
            res.send({
                ok: false,
                mensaje: 'No se encontro un usuario con este email.'
            });
        }
    } catch (error){
        res.send({
            ok: false,
            mensaje: error.message
        });
    }
}

const addUser = async (req, res, next) => {
    try{
        const data = req.body;
        const userList = await getDocs(query(collection(firestore, 'users'), where('email', '==', data.email)));
        const usersArray = [];
        userList.forEach(doc => {
            const user = new User(
                doc.id,
                doc.data().usuario,
                doc.data().email,
                doc.data().phone,
                doc.data().password,
                doc.data().unidades,
                doc.data().estado,
                doc.data().createdAt
            );
            usersArray.push(user);
        });
        if(usersArray.length==0){
            if(data.confpassword==data.password){
                data.password = bcrypt.hashSync(data.password, 10);
                const docRef = await addDoc(collection(firestore, "users"), {
                    usuario: data.usuario,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    unidades: {},
                    estado: 'habilitado',
                    createdAt: new Date().getTime()
                });
                const docf = await getDoc(doc(firestore, "users", docRef.id));
                var us = new User(
                    docf.id,
                    docf.data().usuario,
                    docf.data().email,
                    docf.data().phone,
                    docf.data().password,
                    docf.data().unidades,
                    docf.data().estado,
                    docf.data().createdAt
                );
                res.send({
                    ok: true,
                    mensaje: 'Usuario Guardado.',
                    usuario: us
                });
            }else{
                res.send({
                    ok: false,
                    mensaje: "Las contraseñas no coinciden."
                });
            }
        } else {
            res.send({
                ok: false,
                mensaje: "Ya existe un usuario con este Email."
            });
        }
    } catch (error){
        res.send({
            ok: false,
            mensaje: error.message
        });
    }
}

const setUser = async (req, res, next) => {
    try{
        const data = req.body;
        if(data.confpassword==data.password){
            if(data.password!=null&&data.password!=''){
                data.password = bcrypt.hashSync(data.password, 10);
            }
            
            const docRef = await setDoc(doc(firestore, "users", data.id), {
                usuario: data.usuario,
                email: data.email,
                phone: data.phone,
                password: data.password,
                unidades: data.unidades,
                estado: data.estado,
                createdAt: data.createdAt
            });
            const docf = await getDoc(doc(firestore, "users", data.id));
            var us = new User(
                docf.id,
                docf.data().usuario,
                docf.data().email,
                docf.data().phone,
                docf.data().password,
                docf.data().unidades,
                docf.data().estado,
                docf.data().createdAt
            );
            res.send({
                ok: true,
                mensaje: 'Usuario Actualizado.',
                usuario: us
            });
        }else{
            res.send({
                ok: false,
                mensaje: "Las contraseñas no coinciden."
            });
        }
    } catch (error){
        res.send({
            ok: false,
            mensaje: error.message
        });
    }
}

const getAllUser = async (req, res, next) => {
    try{
        const userList = await getDocs(collection(firestore, 'users'));
        const usersArray = [];
        userList.forEach(doc => {
            const user = new User(
                doc.id,
                doc.data().usuario,
                doc.data().email,
                doc.data().phone,
                doc.data().password,
                doc.data().unidades,
                doc.data().estado,
                doc.data().createdAt
            );
            usersArray.push(user);
        });
        res.send({
            ok: true,
            mensaje: 'Lista de Usuarios.',
            users: usersArray
        });
    } catch (error){
        res.send({
            ok: false,
            mensaje: error.message
        });
    }
}

module.exports = {
    loginUser,
    addUser,
    setUser,
    getAllUser
}