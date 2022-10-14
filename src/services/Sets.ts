import { api, defaultOptions, loginSession } from './Api';
import { CapacitorHttp } from '@capacitor/core';


export default new class{
    public async getUserSet(){
        return await CapacitorHttp.get({url: api + "/api/user/set", ...defaultOptions, ...await loginSession()});
    }

    public async getSet(id: number){
        return await CapacitorHttp.get({url: api + "/api/set/" + id, ...defaultOptions});
    }

    public async updateSet(id: number, set: any){
        return await CapacitorHttp.put({url: api + "/api/set/" + id, data: set, ...defaultOptions, ...await loginSession()});
    }

    public async createSet(set: any){
        return await CapacitorHttp.post({url: api + "/api/set", data: set, ...defaultOptions, ...await loginSession()});
    }

    public async deleteSet(id: number){
        return await CapacitorHttp.delete({url: api + "/api/set/" + id, ...defaultOptions, ...await loginSession()});
    }

    public async searchSet(query: string, count : number = 10){
        return await CapacitorHttp.get({url: api + "/api/set/search/" + query + "/" + count, ...defaultOptions});
    }

    public async getUserStatShort(id: number){
        return await CapacitorHttp.get({url: api + "/api/user/stat/" + id + "/short", ...defaultOptions, ...await loginSession()});
    }

    public async updateUserStat(id: number, card: number, type: string){
        return await CapacitorHttp.put({url: api + "/api/user/stat/" + id + "/" + card, data: {type: type}, ...defaultOptions, ...await loginSession()});
    }
}();