import {createSlice} from '@reduxjs/toolkit';

const initialState = [
    {
        id: 0,
        title: 'Terminal 1',
        content: '',
        isActive: true,
        command: '',
        width: 12,
        height: 4,
        x: 1,
        y: 1,
        backgroundColor: '#000',
        color: '#9c9ea0',
        fontSize: 14,
        cursor: 'default'
    },
];
export const tabsSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        tabAdded(state, action) {
            const oldTab = state.find(tab => tab.isActive);
            if (oldTab) oldTab.isActive = false;
            state.push(action.payload)
        },
        tabRemoved(state, action) {
            state.splice(state.findIndex(tab => tab.id === action.payload), 1);
        },
        setTabActive(state, action) {
            const oldTab = state.find(tab => tab.isActive);
            if (oldTab) oldTab.isActive = false;
            const currentTab = state.find(tab => tab.id === action.payload);
            currentTab.isActive = true;
        },
        updateTabDimension(state, action) {
            const {id, width, height, x, y} = action.payload;
            const tab = state.find(tab => tab.id === id);
            tab.width = width;
            tab.height = height;
            tab.x = x;
            tab.y = y;
        },
        updateTabSetting(state, action) {
            const {id, key, value} = action.payload;
            const tab = state.find(tab => tab.id === id);
            tab[key] = value;
        },
        setTabActiveCommand(state, action) {
            const activeTab = state.find(tab => tab.isActive);
            activeTab.command = action.payload
        },
        setTabByIdCommand(state, action) {
            const {command, id} = action.payload;
            const activeTab = state.find(tab => tab.id === id);
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
        return null
    });
    return {width, height};
};

export const getTabByTab = (state, tabId) => state.tabs.find(tab => tab.id === tabId);

export const {tabAdded, tabRemoved, setTabActive, setTabActiveCommand, setTabByIdCommand, updateTabDimension, updateTabSetting} = tabsSlice.actions;

export default tabsSlice.reducer;