<template>
  <BookingMain
    :isLoaded="isLoaded"
    :item="item"
    :members="members"
  />
</template>

<script>
import BookingMain from '@/components/booking/BookingMain'
import { getActivity } from '@/api/activities'
import { getFamilyMembers } from '@/api/profile'

export default {
  components: {
    BookingMain
  },
  data () {
    return {
      isLoaded: false,
      item: {},
      members: []
    }
  },
  computed: {
    activityId () {
      return this.$route.params.id
    }
  },
  created () {
    this.getActivity(this.activityId)
    this.getFamilyMembers()
  },
  methods: {
    async getActivity (id) {
      let response = await getActivity(id)
      if (response.data.return) {
        this.item = response.data.item
      }
    },
    async getFamilyMembers () {
      let response = await getFamilyMembers()
      if (response.data.list) {
        this.isLoaded = true
        this.members = response.data.list
      }
    }
  }
}
</script>