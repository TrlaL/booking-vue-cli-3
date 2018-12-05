<template>
  <div class="container box">
    <HomeControls />
    <ActivitiesTypes @changeType="changeActivityType" />
    <ActivitiesList :items="items" />
    <Loading v-show="!isLoadedItems" />
    <div class="pagination" v-show="paginationVisible">
      <a @click="getNextPage">Next Page</a>
    </div>
  </div>
</template>

<script>
import ActivitiesList from '@/components/common/ActivitiesList'
import ActivitiesTypes from '@/components/common/ActivitiesTypes'
import HomeControls from '@/components/home/HomeControls'
import Loading from '@/components/common/Loading'
import { getActivities } from '@/api/activities'

export default {
  components: { ActivitiesList, ActivitiesTypes, HomeControls, Loading },
  data () {
    return {
      activityTypeId: 1,
      items: [],
      itemsPerPage: 10,
      page: 1,
      pagesCount: 0
    }
  },
  computed: {
    filters () {
      return this.$store.getters.filters
    },
    isLastPage () {
      return this.page === this.pagesCount
    },
    isLoadedItems () {
      return this.$store.getters.isLoadedItems
    },
    paginationVisible () {
      return this.isLoadedItems && this.items.length && !this.isLastPage
    },
    searchQuery () {
      return this.$store.getters.searchQuery
    }
  },
  created () {
    this.getActivities({
      filters: { activityTypeId: this.activityTypeId }
    })
  },
  methods: {
    async getActivities (params, query) {
      this.$store.commit('SET_LOADED_STATUS', false)
      let response = await getActivities(params, query)
      if (response.data.result) {
        this.$store.commit('SET_LOADED_STATUS', true)
        this.items = this.items.concat(response.data.items)
        this.pagesCount = response.data.pages.pagesCount
      }
    },
    changeActivityType (type) {
      this.items = []
      this.page = 1
      this.activityTypeId = type
      this.getActivities({
        filters: {
          activityTypeId: this.activityTypeId,
          ...this.filters
        }
      }, this.searchQuery)
    },
    getNextPage () {
      this.page = (this.page + 1 > this.pagesCount) ? this.pagesCount : this.page + 1
      this.getActivities({
        filters: {
          activityTypeId: this.activityTypeId,
          ...this.filters
        },
        pages: {
          page: this.page
        }
      }, this.searchQuery)
    },
    search (value) {
      this.items = []
      this.page = 1
      this.getActivities({
        filters: {
          activityTypeId: this.activityTypeId,
          ...this.filters
        }
      }, this.searchQuery)
    }
  },
  watch: {
    filters (filters) {
      this.items = []
      this.page = 1
      this.getActivities({
        filters: {
          activityTypeId: this.activityTypeId,
          ...filters
        }
      }, this.searchQuery)
    },
    searchQuery (query) {
      this.search(query)
    }
  }
}
</script>

<style lang="scss" scoped>
@include mobile {
  .container,
  .box {
    all: unset;
  }
}

.pagination {
  cursor: pointer;
  font-size: 14px;
  padding: 10px;
  text-align: center;
  text-decoration: underline;
}
</style>