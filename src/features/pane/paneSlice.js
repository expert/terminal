import {createSlice} from '@reduxjs/toolkit';

const initialState = [
    {
        command: 'ls',
        body: `Applications
        Applications (Parallels)
        Desktop
        Documents
        Downloads
        Library
        Movies
        Music
        Parallels
        Pictures
        Public
        avada.zip
        jetbrains-reset-trial-evaluation-mac
        plugins.zip
        projects
        property-single-view.php
        uploads.zip
        alexei@iMacALexeiC`,
        tabId: 0
    },
];
export const paneSlice = createSlice({
    name: 'pane',
    initialState,
    reducers: {
        paneAdded(state, action) {
            state.push(action.payload)
        }
    },
});

export const selectPane = state => state.pane;
export const selectPaneByTab = (state, tabId) => state.pane.filter(item => item.tabId === tabId);

export const {paneAdded} = paneSlice.actions;

export default paneSlice.reducer;
