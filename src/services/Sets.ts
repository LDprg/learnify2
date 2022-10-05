import api from './Api';

export default new class{
    public async getUserSet(){
        return await api.get("/api/user/set");
    }

    public async getSet(id: number){
        return await api.get("/api/set/" + id);
    }
}();