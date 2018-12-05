<template>
  <div class="box container">
    <AccountModal @updated="$emit('updated')" />
    <div class="section">
      <div class="title">
        <img class="title-icon" src="@/assets/images/user-black.svg">
        My account
      </div>
      <div class="blocks" v-if="loaded.isSettingsLoaded">
        <AccountPerson :settings="settings" @saveUserSettings="saveUserSettings" />
      </div>
      <Loading v-else />
    </div>
    <div class="section">
      <div class="title">
        <img class="title-icon" src="@/assets/images/payment.svg">
        My payment method
      </div>
      <div class="blocks" v-if="loaded.isCardsLoaded">
        <AccountCard
          v-for="(card, i) in cards"
          :card="card"
          :key="i"
          @deleteCard="deleteCard"
          @handleCard="handleCard"
        />
        <div class="empty" v-show="!cards.length">You have not added cards yet.</div>
        <div class="add">
          <a @click="$emit('addCard')">+ Add Card</a>
        </div>
      </div>
      <Loading v-else />
    </div>
    <div class="section">
      <div class="title">
        <img class="title-icon" src="@/assets/images/credits.svg">
        GoBambino Credits
      </div>
      <div class="blocks">
        <AccountCredits :settings="settings" @addCredit="addCredit" />
      </div>
    </div>
  </div>
</template>

<script>
import AccountCard from './AccountCard'
import AccountCredits from './AccountCredits'
import AccountModal from './AccountModal'
import AccountPerson from './AccountPerson'
import Loading from '../common/Loading'

export default {
  components: { AccountCard, AccountCredits, AccountModal, AccountPerson, Loading },
  props: {
    cards: { required: true, type: Array },
    credits: { required: true, type: Array },
    loaded: { required: true, type: Object },
    settings: { required: true, type: Object }
  },
  methods: {
    addCredit () {
      this.$store.commit('SET_MODAL_VISIBLE', { id: 'account-modal', visible: true })
    },
    deleteCard (id) {
      this.$emit('deleteCard', id)
    },
    handleCard (card) {
      if (card.isNew) {
        this.$emit('createCard', card)
      } else {
        this.$emit('updateCard', card)
      }
    },
    saveCard (card) {
      this.$emit('saveCard', card)
    },
    saveUserSettings (data) {
      this.$emit('saveUserSettings', data)
    }
  }
}
</script>

<style lang="scss" scoped>
@include desktop {
  .container {
    padding: 25px 0 25px 0;
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
    box-shadow: none;
  }

  .container {
    background: #eee;
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