<template>
  <BookingMain
    :isLoaded="isLoaded"
    :item="item"
    :members="members"
    @newPersons="newPersons"
  />
</template>

<script>
import BookingMain from '@/components/booking/BookingMain'
import { getActivity } from '@/api/activities'
import { getFamilyMembers, saveAdult, saveChild } from '@/api/profile'

export default {
  components: { BookingMain },
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
        this.members = response.data.list.map((member, i) => {
          return { ...member, i }
        })
      }
    },
    async saveAdult (data) {
      let response = await saveAdult(data)
      if (!response.data.result) {
        alert('error')
      }
    },
    async saveChild (data) {
      let response = await saveChild(data)
      if (!response.data.result) {
        alert('error')
      }
    },
    newPersons (persons) {
      persons.forEach(person => {
        let api = person.isChild ? this.saveChild : this.saveAdult
        api({ fullName: person.fullName })
      })
    }
  }
}
</script>