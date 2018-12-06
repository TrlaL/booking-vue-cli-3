<template>
  <div class="container">
    <AccountModal />
    <Modal class="modal-message" id="account">{{ message }}</Modal>
    <Navigation />
    <div class="box">
      <div class="section">
        <div class="title">
          <img class="title-icon" src="@/assets/images/user-black.svg">
          My account
        </div>
        <AccountPerson
          v-if="isSettingsLoaded"
          :settings="settings"
          @handleError="showModal"
          @saveUserSettings="saveUserSettings"
        />
        <Loading v-else />
      </div>
      <div class="section">
        <div class="title">
          <img class="title-icon" src="@/assets/images/payment.svg">
          My payment method
        </div>
        <template v-if="isCardsLoaded">
          <div class="cards">
            <AccountCard
              v-for="(card, i) in cards"
              :card="card"
              :key="i"
              @deleteCard="deleteCard"
              @handleCard="handleCard"
              @handleError="showModal"
            />
          </div>
          <div class="empty" v-show="!cards.length">You have not added cards yet.</div>
          <div class="add">
            <a @click="addCard">+ Add Card</a>
          </div>
        </template>
        <Loading v-else />
      </div>
      <div class="section">
        <div class="title">
          <img class="title-icon" src="@/assets/images/credits.svg">
          GoBambino Credits
        </div>
        <AccountCredits :settings="settings" @addCredit="addCredit" />
      </div>
    </div>
  </div>
</template>

<script>
import AccountCard from '@/components/account/AccountCard'
import AccountCredits from '@/components/account/AccountCredits'
import AccountModal from '@/components/account/AccountModal'
import AccountPerson from '@/components/account/AccountPerson'
import Loading from '@/components/common/Loading'
import Modal from '@/components/common/Modal'
import Navigation from '@/components/common/Navigation'
import { loadUserSettings, saveUserSettings } from '@/api/profile'
import { getCards, createCard, deleteCard, updateCard } from '@/api/cards'

export default {
  components: {
    AccountCard,
    AccountCredits,
    AccountModal,
    AccountPerson,
    Loading,
    Modal,
    Navigation
  },
  data () {
    return {
      cards: [],
      isCardsLoaded: false,
      isSettingsLoaded: false,
      message: '',
      settings: {}
    }
  },
  created () {
    this.getCards()
    this.loadUserSettings()
  },
  methods: {
    async getCards () {
      let response = await getCards()
      if (response.data) {
        this.isCardsLoaded = true
        this.cards = response.data
      }
    },
    async createCard (data) {
      let response = await createCard({
        number: data.number,
        expireDate: data.expireDate
      })
      if (response.data.success) {
        this.showModal('Data has been saved')
        this.getCards()
      }
    },
    async deleteCard (id) {
      await deleteCard(id)
      this.showModal('Card was deleted successfully')
      this.getCards()
    },
    async loadUserSettings () {
      let response = await loadUserSettings()
      if (response.data.result) {
        this.isSettingsLoaded = true
        this.settings = response.data.user
      }
    },
    async saveUserSettings (data) {
      let response = await saveUserSettings({
        id: data.id,
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        ...(data.password && { password: data.password })
      })
      if (response.data.result) {
        this.showModal('Data has been saved')
      }
    },
    async updateCard (data) {
      let response = await updateCard(data.id, {
        number: data.number,
        expireDate: data.expireDate
      })
      if (response.data.success) {
        this.showModal('Card was updated successfully')
        this.getCards()
      }
    },
    addCard () {
      this.cards.push({
        isNew: true,
        number: '',
        expireDate: '',
        cvv: ''
      })
    },
    addCredit () {
      this.$store.commit('SET_MODAL_VISIBLE', { id: 'account-modal', visible: true })
    },
    handleCard (card) {
      if (card.isNew) {
        this.createCard(card)
      } else {
        this.updateCard(card)
      }
    },
    showModal (message) {
      this.message = message
      this.$store.commit('SET_MODAL_VISIBLE', { id: 'account', visible: true })
    },
    update () {
      this.loadUserSettings()
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-message {
  font-size: 18px;
  text-align: center;
}

@include desktop {
  .box {
    padding: 35px 0 35px 0;
  }

  .section {
    color: #4F4F4F;
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
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
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
    background: #eee;
    border-top: 1px solid #ddd;
    color: #E1519F;
    cursor: pointer;
    text-align: center;

    a {
      display: block;
      padding: 10px;
    }
  }
}
</style>