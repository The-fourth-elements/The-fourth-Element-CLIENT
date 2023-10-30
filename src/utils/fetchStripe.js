export const getPrices = async (route) => {
    try {
        const response = await fetch(`${process.env.API_BACKEND}${route}`);
        const prices = await response.json();
        return prices;
    }
    catch (error) {
        console.log(error);
        throw Error(error)
    }
}