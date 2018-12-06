<template>
  <div class="container">
    <Modal id="family" class="modal">{{ message }}</Modal>
    <Navigation />
    <div class="box">
      <div class="section">
        <div class="title">
          <img class="title-icon" src="@/assets/images/kid.svg">
          Kid(s)
        </div>
        <div class="persons" v-if="isLoaded">
          <FamilyPerson
            person="kid"
            v-for="(kid, i) in kids"
            :data="kid"
            :key="i"
            @deletePerson="deleteFamilyMember"
            @handleError="showModal"
            @savePerson="savePerson"
          />
        </div>
        <Loading v-else />
        <div class="empty" v-show="isLoaded && !kids.length">You have not added children yet.</div>
        <div class="add" v-show="isLoaded">
          <a @click="addPerson('kid')">+ Add Kid</a>
        </div>
      </div>
      <div class="section">
        <div class="title">
          <img class="title-icon" src="@/assets/images/user-black.svg">
          Caregiver(s)
        </div>
        <div class="persons" v-if="isLoaded">
          <FamilyPerson
            person="caregiver"
            v-for="(caregiver, i) in caregivers"
            :data="caregiver"
            :key="i"
            @deletePerson="deleteFamilyMember"
            @handleError="showModal"
            @savePerson="savePerson"
          />
        </div>
        <Loading v-else />
        <div class="empty" v-show="isLoaded && !caregivers.length">You have not added caregivers yet.</div>
        <div class="add" v-show="isLoaded">
          <a @click="addPerson('caregiver')">+ Add Caregiver</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FamilyPerson from '@/components/family/FamilyPerson'
import Loading from '@/components/common/Loading'
import Modal from '@/components/common/Modal'
import Navigation from '@/components/common/Navigation'
import { deleteFamilyMember, getFamilyMembers, saveAdult, saveChild } from '@/api/profile'

export default {
  components: { FamilyPerson, Loading, Modal, Navigation },
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
  computed: {
    caregivers () {
      return this.members.filter(member => !member.isChild)
    },
    kids () {
      return this.members.filter(member => member.isChild)
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

@include desktop {
  .box {
    padding: 35px 0 35px 0;
  }

  .section {
    margin: auto;
    margin-bottom: 25px;
    max-width: 70%;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .title {
    color: #E1519F;
    font-size: 15px;
    margin-bottom: 15px;

    &::after {
      content: ':';
    }

    .title-icon {
      display: none;
    }
  }

  .add {
    display: flex;
    justify-content: flex-end;

    a {
      cursor: pointer;
      color: #D9429F;
      display: block;
      font-size: 14px;
      width: 120px;
    }
  }
}

@include mobile {
  .box {
    background: #eee;
    box-shadow: none;
    margin: 0;
  }

  .empty {
    margin: 20px;
  }

  .section {
    background: #fff;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .title {
    align-items: center;
    background: #eee;
    border-top: 1px solid #ddd;
    color: #E1519F;
    display: flex;
    font-size: 18px;
    padding: 10px 20px 10px 20px;

    .title-icon {
      display: block;
      height: 30px;
      margin-right: 5px;
      object-fit: contain;
      width: 30px;
    }
  }

  .add {
    border-top: 1px solid #ddd;
    background: #eee;
    color: #E1519F;
    cursor: pointer;
    text-align: center;
    width: 100%;

    a {
      display: block;
      padding: 10px;
    }
  }
}
</style>