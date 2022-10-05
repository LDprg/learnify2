import { singletonHook } from 'react-singleton-hook';
import User from '../services/User';
import Sets from '../services/Sets';

import { useState } from "react";

const useApi = (apiFunc: any) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const request = async (...args: any) => {
        setLoading(true);
        try {
            const result = await apiFunc(...args);
            setData(result.data);
            setError("");
        } catch (e: any) {
            setData(null);
            setError(e.message || "Unexpected Error!");
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        error,
        loading,
        request
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