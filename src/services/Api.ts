import { Drivers, Storage } from '@ionic/storage';
import { CapacitorCookies } from '@capacitor/core';
import { isPlatform } from '@ionic/core';


const getCookies = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export var api = "http://localhost:8080";
export const setApi = (url: string) => api = url;
export const defaultOptions = {
    headers: {
        "Content-Type": "application/json",
        "SameSite": "None",
    }
}

const storeHooks = new Storage({
    name: '__hooks',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
});
storeHooks.create();

const storeSession = new Storage({
    name: '__Session',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
});
storeSession.create();

export const setSession = async (session: string) => {
    if (isPlatform("capacitor"))
        storeSession.set('connect.sid', session);
    else
        CapacitorCookies.setCookie({ url: api, key: 'connect.sid', value: session, path: '/' });
}

export const deleteSession = async () => {
    if (isPlatform("capacitor"))
        storeSession.set('connect.sid', undefined);
    else
        CapacitorCookies.deleteCookie({ url: api, key: 'connect.sid' });
}

export const getSession = async () => {
    if (isPlatform("capacitor"))
        return storeSession.get('connect.sid');
    else
        return getCookies('connect.sid');
}

export const loginSession = async () => {
    const session = await getSession();
    return {
        params: {
            accessToken: session ? session : ''
        },
    };
}

setTimeout(async () => {
    api = await storeHooks.get('link');
}, 1000);

// api.interceptors.request.use( async config => { config.baseURL=await store.get('link'); return config; }, error => Promise.reject(error) );