<template>
  <div class="container">
    <Navigation v-show="!isActivitiesPage" />
    <div class="box">
      <ActivitiesControls v-show="isActivitiesPage" />
      <ActivitiesTypes :isLoaded="isLoaded" @changeType="reloadItems" />
      <ActivitiesList :isLoaded="isLoaded" :items="items" />
      <Loading class="loading" v-show="!isLoaded" />
      <div class="pagination" v-show="isPaginationVisible">
        <a @click="nextPage">Next Page</a>
      </div>
    </div>
  </div>
</template>

<script>
import ActivitiesControls from '@/components/activities/ActivitiesControls'
import ActivitiesList from '@/components/activities/ActivitiesList'
import ActivitiesTypes from '@/components/activities/ActivitiesTypes'
import Loading from '@/components/common/Loading'
import Navigation from '@/components/common/Navigation'
import { getActivities } from '@/api/activities'
import { getCurrentActivities, getPastActivities } from '@/api/bookings'
import { getFavorites } from '@/api/favorites'

export default {
  components: { ActivitiesControls, ActivitiesList, ActivitiesTypes, Loading, Navigation },
  data () {
    return {
      activityTypeId: 1,
      functions: [getActivities, getFavorites, getCurrentActivities, getPastActivities],
      isLoaded: false,
      items: [],
      itemsPerPage: 5,
      page: 1,
      pagesCount: 0
    }
  },
  computed: {
    api () {
      return this.functions[this.pageId]
    },
    filters () {
      return this.$store.getters.filters
    },
    isActivitiesPage () {
      return this.pageId === 0
    },
    isFavoritesPage () {
      return this.pageId === 1
    },
    isLastPage () {
      return this.page === this.pagesCount
    },
    isPaginationVisible () {
      return this.isLoaded && this.items.length && !this.isLastPage
    },
    pageId () {
      return this.$route.meta.id
    },
    searchQuery () {
      return this.$store.getters.searchQuery
    }
  },
  watch: {
    filters (filters) {
      this.reloadItems()
      console.log(filters)
    },
    searchQuery (query) {
      this.reloadItems()
    }
  },
  created () {
    this.getItems()
  },
  methods: {
    async getItems (data = {}) {
      this.isLoaded = false
      let filters = { ...data.filters, ...this.filters, activityTypeId: this.activityTypeId }
      let pages = { ...data.pages, ipp: this.itemsPerPage }
      let response = await this.api({ filters, pages, sorting: data.sorting }, this.searchQuery)
      if (response.data.result) {
        this.isLoaded = true
        this.items = this.items.concat(response.data.items)
        this.pagesCount = response.data.pages.pagesCount
      }
    },
    nextPage () {
      this.page = (this.page + 1 > this.pagesCount) ? this.pagesCount : this.page + 1
      this.getItems({
        pages: { page: this.page }
      })
    },
    reloadItems (activityTypeId) {
      this.items = []
      this.activityTypeId = activityTypeId || this.activityTypeId
      this.page = 1
      this.getItems()
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  padding: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  padding: 10px;

  a {
    color: #333;
    cursor: pointer;
    text-decoration: underline;
  }
}

@include mobile {
  .box {
    all: unset;
  }
}
</style>