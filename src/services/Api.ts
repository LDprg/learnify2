import axios from 'axios';
import { Drivers, Storage } from '@ionic/storage';

var api = axios.create({
    baseURL: "http://localhost:8010/proxy",
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': "*",
    }
});

const store = new Storage({
    name: '__hooks',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
});
store.create();

api.interceptors.request.use( async config => { config.baseURL=await store.get('link'); return config; }, error => Promise.reject(error) );

export default api;