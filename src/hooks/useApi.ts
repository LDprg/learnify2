import { useState } from "react";

const useApi = (apiFunc: any) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>("");
    const [loading, setLoading] = useState<any>(false);

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

export default useApi;
