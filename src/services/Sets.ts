import api from './Api';

export default new class{
    public async getUserSet(){
        return await api.get("/api/user/set");
    }
}();