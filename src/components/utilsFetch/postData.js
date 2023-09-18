export const postData = async (url, data, token) => {
    try {
        const headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "include",
            headers,
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        });
        
        const responseParsed = await response.json();
        
        if (responseParsed.error) {
            throw new Error(responseParsed.error);
        }
        
        return responseParsed;
    } catch (error) {
        throw new Error('Error:', error);
    }
}