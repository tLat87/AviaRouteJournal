import { createSlice } from '@reduxjs/toolkit';

const mealsSlice = createSlice({
    name: 'meals',
    initialState: [],
    reducers: {
        addMeal: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const { addMeal } = mealsSlice.actions;
export default mealsSlice.reducer;
