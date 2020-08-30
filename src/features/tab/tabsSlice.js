import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {id: 1, title: 'kok', content: 'asdf'},
    {id: 2, title: 'test', content: 'rtetaer'},
];
export const tabsSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        tabAdded(state, action) {
            state.push(action.payload)
        }
    },
});


export const selectTabs = state => state.tabs;
export const { tabAdded } = tabsSlice.actions;

export default tabsSlice.reducer;
