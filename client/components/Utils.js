import { AsyncStorage } from 'react-native';
import jwt_decode from 'jwt-decode';

import Config from './Config.js';

const Utils = {

    signUp : (userName, password) => {
        
        return fetch(Config.server + '/signUp', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({userName: userName, password: password})
            })
            .then((res) => {
                return res.json();
            })
    },

    
    login : (userName, password) => {
        
        return fetch(Config.server + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({userName: userName, password: password})
            })
            .then((res) => {
                return res.json();
            })
    },

    
    setToken : (token) => {
        AsyncStorage.setItem('token', token);
    },


    logout : () => {
        AsyncStorage.removeItem("token");
    },


    checkToken : () => {
        return AsyncStorage.getItem('token');
    },

    getUserDetails : (token) => jwt_decode(token),
}


export default Utils;