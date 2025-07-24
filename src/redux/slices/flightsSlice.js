import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    flights: [], // Масив для зберігання всіх об'єктів польотів
};

const flightsSlice = createSlice({
    name: 'flights',
    initialState,
    reducers: {
        // Дія для додавання нового польоту
        addFlight: {
            reducer(state, action) {
                state.flights.push(action.payload);
            },
            // Call prepare для генерації унікального ID та встановлення значень за замовчуванням
            prepare(flightDetails) {
                return {
                    payload: {
                        id: nanoid(), // Генеруємо унікальний ID для польоту
                        date: flightDetails.date || '',
                        from: flightDetails.from || '',
                        to: flightDetails.to || '',
                        airline: flightDetails.airline || '',
                        flightNumber: flightDetails.flightNumber || '',
                        class: flightDetails.class || 'Economy',
                        aircraft: flightDetails.aircraft || '',
                        duration: flightDetails.duration || '',
                        impression: flightDetails.impression || 0, // 0-5 для зірок
                        note: flightDetails.note || '',
                        pics: flightDetails.pics || [], // Масив URI/шляхів зображень
                        isNightFlight: flightDetails.isNightFlight || false,
                        isAlarming: flightDetails.isAlarming || false,
                        isFavorite: flightDetails.isFavorite || false,
                        createdAt: new Date().toISOString(), // Мітка часу додавання
                    },
                };
            },
        },
        // Дія для оновлення існуючого польоту
        updateFlight(state, action) {
            const { id, ...updatedFields } = action.payload;
            const existingFlight = state.flights.find(flight => flight.id === id);
            if (existingFlight) {
                Object.assign(existingFlight, updatedFields);
            }
        },
        // Дія для видалення польоту
        deleteFlight(state, action) {
            state.flights = state.flights.filter(flight => flight.id !== action.payload);
        },
        // Необов'язково: Дія для встановлення цілого нового масиву польотів (наприклад, з локального сховища)
        setFlights(state, action) {
            state.flights = action.payload;
        },
    },
});

export const { addFlight, updateFlight, deleteFlight, setFlights } = flightsSlice.actions;

export default flightsSlice.reducer;
