import { create } from 'zustand';

const initialModulestoShow = {};
const initialDates = {
    start: '',
    end: '',
};

export const useFilterKnowRegister = create((set, get) => ({
    filtersActive: {
        Fecha: false,
        Modulo: false,
    },
    modulesToShowed: initialModulestoShow,
    dates: initialDates,

    setFilter: (filter, value) => {
        set(state => {
            if (filter === 'Fecha' && !value) {
                return {
                    ...state,
                    filtersActive: {
                        ...state.filtersActive,
                        [filter]: value,
                    },
                    dates: initialDates,
                };
            } else if (filter === 'Modulo' && !value) {
                return {
                    ...state,
                    filtersActive: {
                        ...state.filtersActive,
                        [filter]: value,
                    },
                    modulesToShowed: initialModulestoShow,
                };
            } else {
                return {
                    filtersActive: {
                        ...state.filtersActive,
                        [filter]: value,
                    },
                };
            }
        });
    },
    setModulesToShowed: (moduleId, value) => {
        set(state => ({
            modulesToShowed: {
                ...state.modulesToShowed,
                [moduleId]: value,
            },
        }));
    },
    setDatesRange: (startOrEnd, date) => {
        set(state => ({
            dates: {
                ...state.dates,
                [startOrEnd]: date,
            }
        }))
    },
    filterKnowRegister: () => {

    }
}));
