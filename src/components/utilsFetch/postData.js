export const postData = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        });
        const responseParsed = await response.json();
        if (responseParsed.error) {
            throw new Error(responseParsed)
        }
        return responseParsed;

    } catch (error) {
        throw new Error('error', error)
    }
}