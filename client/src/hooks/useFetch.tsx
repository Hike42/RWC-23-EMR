import { useState } from "react";

type fetchAPI = ({ url, method, body }: fetchProps) => Promise<Response>;

interface fetchProps {
    url: RequestInfo | URL,
    method: string,
    body?: BodyInit
}

function useFetch(): [fetchAPI, boolean] {
    const [loading, setLoading] = useState(false);

    const setHeaders = (body: BodyInit | undefined) => {
        const headers: HeadersInit | undefined = {
            'accept':'application/json'
        };

        if (body) headers['Content-Type'] = 'application/json';

        const token = localStorage.getItem('token');
        if (token) headers['Authorization'] = "Bearer " + token;
        
        return headers;
    }

    const fetchAPI = async ({url, method, body}: fetchProps) => {
        setLoading(true);
        try {
            return fetch(url, {
                method: method,
                headers: setHeaders(body),
                body: body && body
            })
        } catch (error) {
            console.error("Une erreur est survenue lors de l'accès à l'API :", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return [fetchAPI, loading];
}

export default useFetch;