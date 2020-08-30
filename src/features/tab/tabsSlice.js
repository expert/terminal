import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {id: 1, title: 'Terminal 1', content: 'Hello'},
];
export const tabsSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        tabAdded(state, action) {
            state.push(action.payload)
        },
        tabRemoved(state, action) {
            state.splice(state.findIndex(tab => tab.id === action.payload), 1);
        }
    },
});


export const selectTabs = state => state.tabs;
export const { tabAdded, tabRemoved } = tabsSlice.actions;

export default tabsSlice.reducer;
