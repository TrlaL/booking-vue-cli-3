<template>
  <div class="container">
    <Navigation />
    <div class="box">
      <ActivitiesTypes @changeType="changeActivityType" />
      <ActivitiesList :items="items" />
      <Loading v-show="!isLoadedItems" />
      <div class="pagination" v-show="paginationVisible">
        <button @click="getNextPage">Next Page</button>
      </div>
    </div>
  </div>
</template>

<script>
import ActivitiesList from '@/components/common/ActivitiesList'
import ActivitiesTypes from '@/components/common/ActivitiesTypes'
import Loading from '@/components/common/Loading'
import Navigation from '@/components/common/Navigation'
import { getFavorites } from '@/api/favorites'
import { getCurrentActivities, getPastActivities } from '@/api/bookings'

export default {
  components: {
    ActivitiesList,
    ActivitiesTypes,
    Loading,
    Navigation
  },
  data () {
    return {
      api: null,
      activityTypeId: 1,
      items: [],
      itemsPerPage: 10,
      page: 1,
      pagesCount: 0,
      title: ''
    }
  },
  computed: {
    isLastPage () {
      return this.page === this.pagesCount
    },
    isLoadedItems () {
      return this.$store.getters.isLoadedItems
    },
    paginationVisible () {
      return this.isLoadedItems && this.items.length && !this.isLastPage
    },
    type () {
      return this.$route.name
    }
  },
  created () {
    this.setPageType(this.type)
    this.getActivities({ activityTypeId: this.activityTypeId })
  },
  methods: {
    async getActivities (params) {
      this.$store.commit('SET_LOADED_STATUS', false)
      let response = await this.api(params)
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
      this.getActivities({ activityTypeId: this.activityTypeId })
    },
    getNextPage () {
      this.page = (this.page + 1 > this.pagesCount) ? this.pagesCount : this.page + 1
      this.getActivities({
        activityTypeId: this.activityTypeId,
        page: this.page
      })
    },
    setPageType (type) {
      switch (type) {
        case 'favorites':
          this.api = getFavorites
          this.title = 'FAVORITES'
          break
        case 'going':
          this.api = getCurrentActivities
          this.title = 'I`M GOING'
          break
        case 'past-booked':
          this.api = getPastActivities
          this.title = 'PAST BOOKED'
          break
      }
    }
  },
  watch: {
    type (value) {
      this.items = []
      this.page = 1
      this.activityTypeId = 1
      this.setPageType(value)
      this.getActivities({ activityTypeId: this.activityTypeId })
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
  padding: 10px;
  text-align: center;
}
</style>