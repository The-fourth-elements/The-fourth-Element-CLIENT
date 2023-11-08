import { toast } from 'react-toastify'


export const toastSuccess = (message, autoClose = 5000) => {
    toast.success(message, {
        position: "top-right",
        autoClose: autoClose,
        pauseOnHover: false,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "light",
    })
}
export const toastError = (message, autoClose = 6000) => {
    toast.error(message, {
        position: "top-right",
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
}
export const toastInfo = (message, autoClose = 6000) => {
    toast.info(message, {
        position: "top-right",
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
}
