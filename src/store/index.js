import { createStore } from "vuex";

export default createStore({
    state: {
        schedule: [
            {
                // month + 1, start with 0
                date: new Date(2022, 6, 3), 
                text: 'text for this day'
            },
            {
                date: new Date(2022, 11, 31), 
                text: 'text for this day'
            }]
    },
    getters: {
        getSchedule: state => {
            return state.schedule
        }
    }, 
    mutations: {
        addToSchedule(state, item) {
            state.schedule.push(item)
        }
    }
})