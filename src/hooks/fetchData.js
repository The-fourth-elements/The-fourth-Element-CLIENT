const headers = {
    "Content-Type": "application/json",
};

export const postData = async (url, data = {}, header) => {
    try {

        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-store",
            credentials: "include",
            headers,
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        });
        const responseParsed = await response.json();
        return responseParsed;
    } catch (error) {
        throw new Error('Error:', error);
    }
}


export const putData = async (url, data = {}) => {
    try {
        const response = await fetch(url, {
            method: "PUT",
            mode: "cors",
            cache: "no-store",
            credentials: "include",
            headers,
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        });
        const responseParsed = await response.json();
        return responseParsed;
    } catch (error) {
        throw new Error(`${error}, 'error en el metodo put a la ruta: "${url}"'`)
    }
}