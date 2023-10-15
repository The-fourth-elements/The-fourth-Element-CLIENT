const { create } = require("zustand")
const { getCountry, getCountryAxios } = require("../actions/usersStoreActions")

export const useCountryCity = create((set, get) => ({
    theCountry: "",
    theCity: "",
    getCountry: (name) => {
        getCountry(name)
            .then((data) => {
                set((state) => ({
                    ...state,
                    stringCity: data._id
                }))
            })
    }

}))