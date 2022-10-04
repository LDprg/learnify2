import api from './Api';

export default new class {

    public async signIn(email: string, password: string) {
        return await api.post('/api/auth/signin', {
            "email": email,
            "password": password
        });
    }

    public async signUp(email: string, username: string, password: string) {
        return await api.post('/api/auth/signup', {
            "email": email,
            "username": username,
            "password": password
        });
    }

    public async signOut() {
        return api.post('/api/auth/signout');
    }

    public async getUser() {
        return await api.get('/api/user');
    }
}()