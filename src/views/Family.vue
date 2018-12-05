<template>
  <div class="container">
    <Modal id="family" class="modal">{{ message }}</Modal>
    <Navigation />
    <FamilyMain
      :isLoaded="isLoaded"
      :members="members"
      @addPerson="addPerson"
      @deletePerson="deletePerson"
      @savePerson="savePerson"
    />
  </div>
</template>

<script>
import FamilyMain from '@/components/family/FamilyMain'
import Modal from '@/components/common/Modal'
import Navigation from '@/components/common/Navigation'
import { deleteFamilyMember, getFamilyMembers, saveAdult, saveChild } from '@/api/profile'

export default {
  components: { FamilyMain, Modal, Navigation },
  data () {
    return {
      isLoaded: false,
      members: [],
      message: '',
      newKid: {
        fullName: '',
        birthDate: ''
      },
      newCaregiver: {
        fullName: '',
        email: '',
        phone: ''
      }
    }
  },
  created () {
    this.getFamilyMembers()
  },
  methods: {
    async deleteFamilyMember (id) {
      let response = await deleteFamilyMember(id)
      if (response.data.result) {
        this.showModal('Data was deleted successfully')
        this.getFamilyMembers()
      }
    },
    async getFamilyMembers () {
      let response = await getFamilyMembers()
      if (response.data.list) {
        this.isLoaded = true
        this.members = response.data.list
      }
    },
    async saveAdult (data) {
      let response = await saveAdult(data)
      if (response.data.result) {
        this.showModal('Data has been saved')
        this.getFamilyMembers()
      }
    },
    async saveChild (data) {
      let response = await saveChild(data)
      if (response.data.result) {
        this.showModal('Data has been saved')
        this.getFamilyMembers()
      }
    },
    addPerson (person) {
      this.members.push({
        isNew: true,
        isChild: person === 'kid' ? 1 : 0,
        ...(person === 'kid' ? this.newKid : this.newCaregiver)
      })
    },
    deletePerson (id) {
      this.deleteFamilyMember(id)
    },
    savePerson (person, data) {
      if (person === 'kid') {
        this.saveChild({
          id: data.id,
          fullName: data.fullName,
          birthDate: data.birthDate
        })
      } else {
        this.saveAdult({
          id: data.id,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone
        })
      }
    },
    showModal (message) {
      this.message = message
      this.$store.commit('SET_MODAL_VISIBLE', { id: 'family', visible: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  font-size: 18px;
  text-align: center;
}
</style>