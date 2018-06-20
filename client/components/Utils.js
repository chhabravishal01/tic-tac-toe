import { AsyncStorage } from 'react-native';
import Config from './Config.js';

const Utils = {

    fetch : () => {
        let token = localStorage.getItem('token');

        return fetch(Config.server, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization' : 'JWT ' + token,
            }
            })
            .then(res => {
                return res.json();
            })
    },

    add : (id, value) => {
        let token = localStorage.getItem('token');
        
        return fetch(Config.server + '/add', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : 'JWT ' + token,
                },
                body : JSON.stringify({id: id, caption: value, status: false})
                })
                .then(res => {
                    return res.json();
                })
    },

    check : (id) => {
        let token = localStorage.getItem('token');

        return fetch(Config.server + '/check/' + id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : 'JWT ' + token,
                }
                })
                .then(res => {
                    return res.status;
                })
    },

    remove : (id) => {
        let token = localStorage.getItem('token');
        
        return fetch(Config.server + '/delete/' + id, {
                method: 'DELETE',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'JWT ' + token,
                }
            })
            .then(res => {
                return res.status;
            })
    },

    login : (username, password) => {
        
        return fetch(Config.server + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({username: username, password: password})
            })
            .then((res) => {
                return res.json();
            })
    },

    setToken : (token) => {
        AsyncStorage.setItem('token', token);
    },

    signUp : (username, password) => {
        
        return fetch(Config.server + '/signUp', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({username: username, password: password})
            })
            .then((res) => {
                return res.json();
            })
    },

    logout : () => {
        AsyncStorage.removeItem("token");
    },

    checkToken : () => {
        return AsyncStorage.getItem('token');
    }
}


export default Utils;