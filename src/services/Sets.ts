import api from './Api';

export default new class{
    public async getUserSet(){
        const data = (await api.get("/api/user/set")).data;
        return data;
    }
}();