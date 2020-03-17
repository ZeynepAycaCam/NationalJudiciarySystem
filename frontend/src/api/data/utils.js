import axios from 'axios';
import querystring from 'querystring';

var instance = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 5000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data.result ? response.data.result : response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

function makeRequest(type, path, config = null) {
    return new Promise((resolve, reject) => {
        instance[type](path, querystring.stringify(config)).then((res) => {
            resolve(res);
        }).catch((err) => {
            resolve(err);
        });
    });
}

export { instance, makeRequest };