import { create } from 'zustand';

const initialModulestoShow = {};
const initialDates = {
    start: '',
    end: '',
}

export const useFilterKnowRegister = create((set, get) => ({
    filtersActive: {
        Fecha: false,
        Modulo: false,
    },
    modulesToShowed: initialModulestoShow,
    dates: initialDates,

    setFilter: (filter, value) => {
        set((state) => {
            if (filter === 'Fecha' && !value) {
                // Si el filtro Fecha se desactiva, restablecer las fechas
                return {
                    filtersActive: {
                        ...state.filtersActive,
                        [filter]: value,
                    },
                    dates: initialDates,
                    // Resto de tus estados...
                };
            } else {
                return {
                    filtersActive: {
                        ...state.filtersActive,
                        [filter]: value,
                    },
                    // Resto de tus estados...
                };
            }
        })
    },
    setModulesToShowed: (moduleId, value) => {
        set(state => ({
            modulesToShowed: {
                ...state.modulesToShowed,
                [moduleId]: value,
            },
        }));
    },
    resetFilter: filter => {
        const l = get();
        console.log(l);
    },
}));
