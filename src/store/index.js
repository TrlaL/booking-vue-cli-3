import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filters: {},
    isFiltersOpened: false,
    menuListVisible: false,
    modals: {},
    openedDropDownId: 1,
    searchQuery: ''
  },
  getters: {
    filters: (state) => state.filters,
    isFiltersOpened: (state) => state.isFiltersOpened,
    menuListVisible: (state) => state.menuListVisible,
    modals: (state) => state.modals,
    modalVisible: (state) => (id) => state.modals[id],
    openedDropDownId: (state) => state.openedDropDownId,
    searchQuery: (state) => state.searchQuery
  },
  mutations: {
    SET_FILTERS (state, filters) {
      state.filters = { ...filters }
    },
    SET_FILTERS_OPENED (state, opened) {
      state.isFiltersOpened = opened
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