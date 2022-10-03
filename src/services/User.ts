import axios from 'axios';

const url = 'http://localhost:8010/proxy';

export default new class {
    constructor() {
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = "*";

        axios.defaults.withCredentials = true;
    }

    public async signIn(email: string, password: string) {
        return (await axios.post(url + '/api/auth/signin', {
            "email": email,
            "password": password
        })).data;
    }

    public async getUser() {
        return await axios.get(url + '/api/user');
    }
}()