import { toastError, toastSuccess } from "@/helpers/toast";

export const createAutoRegistro = async (body, moduleId) => {
    try {
        const response = await fetch(`${process.env.API_BACKEND}selfR/${moduleId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        if (data.error) {
            throw data.error;
        }
        toastSuccess("se ha creado con exito el Auto-Registro");
    } catch (error) {
        toastError(error);
    }
}

export const getAutoRegistro = async (id) => {
    try {
        const response = await fetch(`${process.env.API_BACKEND}selfR/${id}`);
        const data = await response.json();
        if (data.error) {
            throw data.error;
        }
        return data
    } catch (error) {
        toastError(error);
    }
}

export const createResponseSR = async (body) => {
    try {
        const response = await fetch(`${process.env.API_BACKEND}responseSR/${body.selfRegisterId}/user/${body.userID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        const data = await response.json()
        if (data.error) {
            throw data.error;
        }
        return data
    } catch (error) {
        toastError(error);
    }
}

export const addResponseSRToUser = async (body) => {
    try {
        const response = await fetch(`${process.env.API_BACKEND}responseSR/${body.responseSRId}/user/${body.userID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        const data = await response.json()
        if (data.error) {
            throw data.error;
        }
        return data
    } catch (error) {
        toastError(error);
    }
}