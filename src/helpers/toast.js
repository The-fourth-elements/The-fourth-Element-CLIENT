import { toast } from 'react-toastify'


export const toastSuccess = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: false,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "light",
    })
}
export const toastError = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
}

