const { create } = require("zustand")
const {getCountry} = require ("../actions/usersStoreActions")

export const useCountryCity = create((set, get) => ({
    theCountry: {hola: "hola"},
    city: {},
    getCountry: (name) => {
        getCountry(name)
        .then((data) => {
            console.log(data)
            set((state) => ({
                ...state,
                stringCity: data.name
            }))
        })
    }
    
}))