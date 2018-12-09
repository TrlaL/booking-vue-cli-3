import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activityTypeId: 1,
    bookingInProgress: false,
    filters: {},
    isBookingComplete: false,
    isFiltersOpened: false,
    menuListVisible: false,
    modals: {},
    openedDropDownId: 1,
    searchQuery: ''
  },
  getters: {
    activityTypeId: (state) => state.activityTypeId,
    bookingInProgress: (state) => state.bookingInProgress,
    filters: (state) => state.filters,
    isBookingComplete: (state) => state.isBookingComplete,
    isFiltersOpened: (state) => state.isFiltersOpened,
    menuListVisible: (state) => state.menuListVisible,
    modals: (state) => state.modals,
    modalVisible: (state) => (id) => state.modals[id],
    openedDropDownId: (state) => state.openedDropDownId,
    searchQuery: (state) => state.searchQuery
  },
  mutations: {
    SET_ACTIVITY_TYPE_ID (state, id) {
      state.activityTypeId = id
    },
    SET_BOOKING_PROGRESS (state, progress) {
      state.bookingInProgress = progress
    },
    SET_FILTERS (state, filters) {
      state.filters = { ...filters }
    },
    SET_BOOKING_STATUS (state, status) {
      state.isBookingComplete = status
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