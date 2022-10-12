import api from './Api';

export default new class{
    public async getUserSet(){
        return await api.get("/api/user/set");
    }

    public async getSet(id: number){
        return await api.get("/api/set/" + id);
    }

    public async updateSet(id: number, set: any){
        return await api.put("/api/set/" + id, set);
    }

    public async createSet(set: any){
        return await api.post("/api/set", set);
    }

    public async deleteSet(id: number){
        return await api.delete("/api/set/" + id);
    }

    public async searchSet(query: string, count : number = 10){
        return await api.get("/api/set/search/" + query + "/" + count);
    }

    public async getUserStatShort(id: number){
        return await api.get("/api/user/stat/" + id + "/short");
    }

    public async updateUserStat(id: number, card: number, type: string){
        return await api.put("/api/user/stat/" + id + "/" + card, {type: type});
    }
}();