<template>
  <div class="activities-controls">
    <div class="controls">
      <div class="filters" :class="className" @click="toggleFilters">
        <img class="icon" src="@/assets/images/filters.svg">
        Filters
        <img class="icon" :src="require(`@/assets/images/${filtersArrow}`)">
      </div>
      <div class="search">
        <input v-model="query" @keydown.enter="search" placeholder="Try “Chess” or “Ballet”" type="text">
        <img class="reset" @click="reset" src="@/assets/images/reset-input.svg">
        <button @click="search">
          <img src="@/assets/images/search.svg">
        </button>
      </div>
      <MenuButton />
    </div>
    <ActivitiesFilters />
  </div>
</template>

<script>
import ActivitiesFilters from './ActivitiesFilters'
import MenuButton from '../common/MenuButton'

export default {
  components: { ActivitiesFilters, MenuButton },
  data () {
    return {
      query: this.searchQuery
    }
  },
  computed: {
    className () {
      return { clicked: this.filters }
    },
    filtersArrow () {
      return this.filters ? 'arrow-top.svg' : 'arrow-bottom.svg'
    },
    isFiltersOpened () {
      return this.$store.getters.isFiltersOpened
    },
    searchQuery () {
      return this.$store.getters.searchQuery
    }
  },
  watch: {
    searchQuery (query) {
      this.query = query
    }
  },
  methods: {
    reset () {
      this.$store.commit('SET_SEARCH_QUERY', '')
    },
    search () {
      this.$store.commit('SET_SEARCH_QUERY', this.query)
    },
    toggleFilters () {
      this.$store.commit('SET_FILTERS_OPENED', !this.isFiltersOpened)
    }
  }
}
</script>

<style lang="scss" scoped>
@include desktop {
  .activities-controls {
    border-bottom: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    padding: 16px 66px 16px 66px;
  }

  .controls {
    display: flex;
    flex: 0 1 1;
    justify-content: space-between;
    max-height: 40px;
    user-select: none;

    .icon {
      height: 30px;
      object-fit: contain;
      width: 30px;
    }

    .filters,
    .search {
      align-items: center;
      border: 1px solid #D9429F;
      border-radius: 5px;
      color: #D9429F;
      cursor: pointer;
      display: flex;
      flex: 1;
      font-size: 17px;
      justify-content: space-between;
      max-width: 250px;
      padding: 5px 17px 5px 17px;
    }

    .filters.clicked {
      background: #D9429F;
      color: #fff;
    }

    .search {
      display: flex;
      padding: 0;

      input {
        border: 0;
        border-radius: 5px 0 0 5px;
        flex: 1;
        height: 100%;
        padding: 0 18px 0 18px;
        width: 100%;
      }

      button {
        background: #D9429F;
        border: 0;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
        height: 100%;
      }

      .reset {
        margin-right: 10px;
      }
    }
  }

  .filters {
    flex: 1;
  }
}

@include mobile {
  .activities-controls {
    display: none;
  }
}
</style>