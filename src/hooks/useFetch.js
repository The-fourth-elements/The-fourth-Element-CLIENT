import { useState, useEffect } from 'react';

const useFetch = url => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    new Error('Algo ocurrio en el fetching a esta url: ' + url);
                }
                console.log(response);

                const dataParser = await response.json();
                setData(dataParser);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url]);
    return { data, isLoading, error };
};
export default useFetch;