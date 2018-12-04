import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filters: {},
    isFiltersOpened: false,
    isLoadedItems: true,
    menuListVisible: false,
    modals: {},
    openedDropDownId: 1,
    searchQuery: ''
  },
  getters: {
    filters (state) {
      return state.filters
    },
    isFiltersOpened (state) {
      return state.isFiltersOpened
    },
    isLoadedItems (state) {
      return state.isLoadedItems
    },
    menuListVisible (state) {
      return state.menuListVisible
    },
    modals (state) {
      return state.modals
    },
    modalVisible: (state) => (id) => {
      return state.modals[id]
    },
    openedDropDownId (state) {
      return state.openedDropDownId
    },
    searchQuery (state) {
      return state.searchQuery
    }
  },
  mutations: {
    SET_FILTERS (state, filters) {
      state.filters = { ...filters }
    },
    SET_FILTERS_OPENED (state, opened) {
      state.isFiltersOpened = opened
    },
    SET_LOADED_STATUS (state, status) {
      state.isLoadedItems = status
    },
    SET_MENU_LIST_VISIBLE (state, visible) {
      state.menuListVisible = visible
    },
    SET_MODAL_VISIBLE (state, params) {
      Vue.set(state.modals, params.id, params.visible)
    },
    SET_OPENED_DROP_DOWN_ID (state, id) {
      state.openedDropDownId = id
    },
    SET_SEARCH_QUERY (state, query) {
      state.searchQuery = query
    }
  }
})