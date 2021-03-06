import {createSlice} from '@reduxjs/toolkit';

const initialState = [
    // {
    //     command: '',
    //     body: ``,
    //     tabId: 0,
    //     id: 0
    // },
];
export const paneSlice = createSlice({
    name: 'pane',
    initialState,
    reducers: {
        paneAdded(state, action) {
            state.push(action.payload)
        },
        paneUpdate(state, action) {
            const {id, body} = action.payload;
            const command = state.find(command => command.id === id);
            command.body = body
        }
    },
});

export const selectPane = state => state.pane;
export const selectPaneByTab = (state, tabId) => state.pane.filter(item => item.tabId === tabId);
export const selectPreviousCommandByTab = (state, {tabId}) => {
    const commands = state.pane.filter(item => item.tabId === tabId);
    return commands.map(command => command.command);
};

export const {paneAdded, paneUpdate} = paneSlice.actions;

export default paneSlice.reducer;

