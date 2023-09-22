import { toast } from 'react-toastify';



export const toastSuccess = (message) => {
    console.log("emma entro aqui")
    const tostada = toast.success (message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0.2,
        theme: "light",
    })
    console.log (tostada)
}
export const toastError = (message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0.2,
        theme: "light",
    })
}

