import { api, defaultOptions, deleteSession, loginSession, setSession } from './Api';
import { CapacitorHttp } from '@capacitor/core';

export default new class {
    public async signIn(email: string, password: string) {
        const res = await CapacitorHttp.post({url: api + '/api/auth/signin', data: {
            "email": email,
            "password": password
        }, ...defaultOptions});
        setSession(res.data.accessToken);
        return res;
    }

    public async signUp(email: string, username: string, password: string) {
        return await CapacitorHttp.post({url: api + '/api/auth/signup', data: {
            "email": email,
            "username": username,
            "password": password
        }, ...defaultOptions});
    }

    public async signOut() {
        deleteSession();
        return CapacitorHttp.post({url: api + '/api/auth/signout', ...defaultOptions});
    }

    public async getUser() {
        return await CapacitorHttp.get({url: api + '/api/user', ...defaultOptions, ...await loginSession()});
    }
}()