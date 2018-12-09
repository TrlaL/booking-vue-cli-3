<template>
  <div class="container">
    <Modal class="modal" :id="modalId">{{ message }}</Modal>
    <Navigation v-show="!isActivitiesPage" />
    <div class="box">
      <ActivitiesControls v-show="isActivitiesPage" />
      <ActivitiesTypes :isLoaded="isLoaded" />
      <ActivitiesList :isLoaded="isLoaded" :items="items" :type="type" @cancelBooking="cancelBooking" />
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
import Modal from '@/components/common/Modal'
import Navigation from '@/components/common/Navigation'
import { getActivities } from '@/api/activities'
import { cancelBooking, getCurrentActivities, getPastActivities } from '@/api/bookings'
import { getFavorites } from '@/api/favorites'

export default {
  components: {
    ActivitiesControls,
    ActivitiesList,
    ActivitiesTypes,
    Loading,
    Modal,
    Navigation
  },
  data () {
    return {
      functions: [getActivities, getFavorites, getCurrentActivities, getPastActivities],
      isLoaded: false,
      items: [],
      itemsPerPage: 100,
      message: '',
      modalId: 'activities',
      page: 1,
      pagesCount: 0
    }
  },
  computed: {
    activityTypeId () {
      return this.$store.getters.activityTypeId
    },
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
    },
    type () {
      return this.$route.name
    }
  },
  watch: {
    activityTypeId () {
      this.reloadItems()
    },
    filters () {
      this.reloadItems()
    },
    searchQuery () {
      this.reloadItems()
    }
  },
  created () {
    this.getItems()
  },
  methods: {
    async getItems (data = {}) {
      this.isLoaded = false
      let filters = { activityTypeId: this.activityTypeId, ...this.filters, ...data.filters }
      let pages = { ipp: this.itemsPerPage, ...data.pages }
      let response = await this.api({ filters, pages, sorting: data.sorting }, this.searchQuery)
      if (response.data.result) {
        this.isLoaded = true
        this.items = this.items.concat(response.data.items)
        this.pagesCount = response.data.pages.pagesCount
      }
    },
    async cancelBooking (id) {
      let response = await cancelBooking(id)
      this.showModal(response.data.message)
    },
    nextPage () {
      this.page = (this.page + 1 > this.pagesCount) ? this.pagesCount : this.page + 1
      this.getItems({
        pages: { page: this.page }
      })
    },
    reloadItems (activityTypeId) {
      this.items = []
      this.page = 1
      this.getItems()
    },
    showModal (message) {
      this.message = message
      this.$store.commit('SET_MODAL_VISIBLE', { id: this.modalId, visible: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  padding: 0 10px 10px 10px;
}

.modal {
  text-align: center;
}

.pagination {
  display: flex;
  justify-content: center;
  padding: 0 10px 10px 10px;

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

  .pagination {
    padding: 10px;
  }
}
</style>