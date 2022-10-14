// eslint-disable-next-line 
import { Drivers, Storage } from '@ionic/storage';

export const useStorage = (key: string) => {
    const store = new Storage({
        name: '__hooks',
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    });
    store.create();

    const get = async () => {
        return await store.get(key);
    };

    const set = async (value: any) => {
        return await store.set(key, value);
    };

    return  {get, set};
}

export const useCardStorage = (key: string) => {
    const store = new Storage({
        name: '__Card',
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    });
    store.create();

    const get = async () => {
        return await store.get(key);
    };

    const set = async (value: any) => {
        return await store.set(key, value);
    };

    return  {get, set};
}