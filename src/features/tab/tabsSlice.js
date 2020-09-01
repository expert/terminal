import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {id: 0, title: 'Terminal 1', content: 'Hello', isActive: true, command: '', width: 12, height: 4, x: 1, y: 1},
];
export const tabsSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        tabAdded(state, action) {
            const oldTab =  state.find(tab => tab.isActive);
            console.log('oldTab', oldTab);
            if(oldTab) oldTab.isActive = false;
            state.push(action.payload)
        },
        tabRemoved(state, action) {
            state.splice(state.findIndex(tab => tab.id === action.payload), 1);
        },
        setTabActive(state, action) {
            const oldTab =  state.find(tab => tab.isActive);
            if(oldTab) oldTab.isActive = false;
            const currentTab =  state.find(tab => tab.id === action.payload);
            currentTab.isActive = true;
        },
        updateTabDimension(state, action) {
            const {id, width, height, x, y} = action.payload;
            console.log('must updaete tab', id)
            const tab = state.find(tab => tab.id === id);
            tab.width = width;
            tab.height = height;
            tab.x = x;
            tab.y = y;
        },
        setTabActiveCommand(state, action) {
            const activeTab =  state.find(tab => tab.isActive);
            activeTab.command = action.payload
        },
        setTabByIdCommand(state, action) {
            const { command, id } = action.payload;
            const activeTab = state.find(tab => tab.id === id);
            console.log('must set command', command, id);
            activeTab.command = command
        }
    },
});


export const selectTabs = state => state.tabs;
export const getActiveTab = state => state.tabs.find(tab => tab.isActive);
export const getTabsDimenssions = state => {
    let width = 0, height = 0;
    state.tabs.map(item => {
        width += item.width;
        height += item.height;
    });
    return { width, height };
};

export const getTabByTab = (state, tabId) => state.tabs.find(tab => tab.id === tabId);

export const { tabAdded, tabRemoved, setTabActive, setTabActiveCommand, setTabByIdCommand, updateTabDimension } = tabsSlice.actions;

export default tabsSlice.reducer;