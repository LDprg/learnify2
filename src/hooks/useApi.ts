import { singletonHook } from 'react-singleton-hook';
import User from '../services/User';
import Sets from '../services/Sets';

import { useState } from "react";

const useApi = (apiFunc: any) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const request = async (...args: any) => {
        await setLoading(true);
        try {
            const result = await apiFunc(...args);
            // console.log(result);
            if (result.status !== 200)
                throw new Error(result.data.message);
            
            await setError("");
            await setData(result.data);
        } catch (e: any) {
            await setData(null);
            await setError(e.message || "Unexpected Error!");
        } finally {
            await setLoading(false);
        }
    };

    const reset = () => {
        setData(null);
        setError("");
        setLoading(false);
    };

    return {
        data,
        error,
        loading,
        request,
        reset
    };
};

const init = {
    data: null,
    error: "",
    loading: false,
    request: async (...args: any) => {}
};


const useSignIn = () => {return useApi(User.signIn)};
export const useSignInGlobal = singletonHook(init, useSignIn);

const useSignOut = () => {return useApi(User.signOut)};
export const useSignOutGlobal = singletonHook(init, useSignOut);

const useSignUp = () => {return useApi(User.signUp)};
export const useSignUpGlobal = singletonHook(init, useSignUp);

export const useGetUser = () => {return useApi(User.getUser)};
export const useGetUserSet = () => {return useApi(Sets.getUserSet)};
export const useGetSet = () => {return useApi(Sets.getSet)};
export const useUpdateSet = () => {return useApi(Sets.updateSet)};
export const useCreateSet = () => {return useApi(Sets.createSet)};
export const useDeleteSet = () => {return useApi(Sets.deleteSet)};
export const useSearchSet = () => {return useApi(Sets.searchSet)};
export const useGetUserStatShort = () => {return useApi(Sets.getUserStatShort)};
export const useUpdateUserStat = () => {return useApi(Sets.updateUserStat)};
export const useUpdateUserStared = () => {return useApi(Sets.updateUserStared)};
