import api from './Api';

export default new class {
    isLogin: boolean = false;

    username: string = "";
    email: string = "";
    id: string = "";

    public async syncLogin() {
        const data = (await api.get('/api/user'));
        console.log(data.status);
        if (data.status == 200) {
            this.isLogin = true;
            this.id = data.data.id;
            this.email = data.data.email;
            this.username = data.data.username;
        } else {            
            this.id = "";
            this.email = "";
            this.username = "";
            this.isLogin = false;
        }
    }

    public async signIn(email: string, password: string) {
        const data = (await api.post('/api/auth/signin', {
            "email": email,
            "password": password
        })).data;

        if (email === data.email) {
            this.id = data.id;
            this.email = data.email;
            this.username = data.username;
            this.isLogin = true;
        } else {
            this.id = "";
            this.email = "";
            this.username = "";
            this.isLogin = false;
        }

        return data;
    }

    public async signUp(email: string, username: string, password: string) {
        const data = (await api.post('/api/auth/signup', {
            "email": email,
            "username": username,
            "password": password
        })).data;

        return data;
    }

    public signOut() {
        this.id = "";
        this.email = "";
        this.username = "";
        this.isLogin = false;
        api.post('/api/auth/signout');
    }

    public async getUser() {
        return (await api.get('/api/user')).data;
    }

    public isLoggedIn() {
        return this.isLogin;
    }
}()