<template>
  <div class="box container">
    <AccountModal @updated="$emit('updated')" />
    <div class="section">
      <div class="title">
        <img class="title-icon" src="@/assets/images/user-black.svg">
        My account
      </div>
      <div class="blocks" v-if="loaded.isSettingsLoaded">
        <div class="block">
          <img class="icon" src="@/assets/images/user-black.svg">
          <div class="forms">
            <div>
              <label>Full Name</label>
              <input type="text" v-model="settings.fullName">
            </div>
            <div>
              <label>Email</label>
              <input type="text" v-model="settings.email">
            </div>
            <div>
              <label>Password</label>
              <input placeholder="**********" type="text" v-model="settings.password">
            </div>
            <div>
              <label>Phone</label>
              <input type="text" v-model="settings.phone">
            </div>
          </div>
          <div class="buttons">
            <button @click="$emit('saveUserSettings', settings)">Update</button>
          </div>
        </div>
      </div>
      <Loading v-else />
    </div>
    <div class="section">
      <div class="title">
        <img class="title-icon" src="@/assets/images/payment.svg">
        My payment method
      </div>
      <div class="blocks" v-if="loaded.isCardsLoaded">
        <div class="block" v-for="(card, i) in cards" :key="i">
          <img class="icon" src="@/assets/images/payment.svg">
          <div class="forms">
            <div>
              <label>Credit Card Number</label>
              <input type="text" v-model="card.number">
            </div>
            <div>
              <label>Experation Date</label>
              <input type="text" v-model="card.expireDate">
            </div>
          </div>
          <div class="buttons">
            <button @click="handleCard(card)">{{ card.isNew ? 'Save' : 'Update' }}</button>
            <template v-if="!card.isNew">
              <button class="mobile-remove" @click="$emit('deleteCard', card.id)">Remove</button>
              <img class="desktop-remove" src="@/assets/images/reset.svg" @click="$emit('deleteCard', card.id)">
            </template>
          </div>
        </div>
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
        <div class="block">
          <img class="icon" src="@/assets/images/credits.svg">
          <div class="forms">
            <div v-if="!settings.money">Currently, no credits available</div>
            <div v-else>You have {{ settings.money }} credits</div>
          </div>
          <div class="buttons">
            <button @click="addCredit">+ Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountModal from './AccountModal'
import Loading from '../common/Loading'

export default {
  components: {
    AccountModal,
    Loading
  },
  props: {
    cards: {
      required: true,
      type: Array
    },
    credits: {
      required: true,
      type: Array
    },
    loaded: {
      required: true,
      type: Object
    },
    settings: {
      required: true,
      type: Object
    }
  },
  methods: {
    addCredit () {
      this.$store.commit('SET_MODAL_VISIBLE', { id: 'account-modal', visible: true })
    },
    handleCard (card) {
      if (card.isNew) {
        this.$emit('createCard', card)
      } else {
        this.$emit('updateCard', card)
      }
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

  .block {
    align-items: center;
    display: flex;
    margin-bottom: 25px;

    .icon {
      height: 60px;
      margin-right: 50px;
      object-fit: contain;
      width: 60px;
    }

    .forms {
      display: flex;
      flex: 1;

      div {
        display: flex;
        flex-direction: column;
        margin-right: 15px;

        &:last-child {
          margin: 0;
        }
      }

      label {
        color: #A1A1A1;
        font-size: 14px;
      }

      input {
        border: 0;
        border-bottom: 1px solid #D4D4D4;
        color: #4F4F4F;
        font: inherit;
        padding: 7px 0 7px 0;
        width: 100%;
      }
    }

    .buttons {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin-left: 50px;
      width: 120px;

      .mobile-remove {
        display: none;
      }

      button {
        background: #E1519F;
        border: 0;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
        font: inherit;
        flex-shrink: 0;
        padding: 8px 0 8px 0;
        width: 90px;
      }

      img {
        cursor: pointer;
      }
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

  .block {
    border-bottom: 1px solid #ddd;
    padding: 20px;

    &:last-child {
      border-bottom: 0;
    }

    .icon {
      display: none;
    }

    .forms {
      margin-bottom: 10px;

      div {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
      }

      label {
        color: #A1A1A1;
        font-size: 14px;
      }

      input {
        border: 0;
        border-bottom: 1px solid #D4D4D4;
        color: #4F4F4F;
        font: inherit;
        padding: 7px 0 7px 0;
        width: 100%;
      }
    }

    .buttons {
      display: flex;

      .desktop-remove {
        display: none;
      }

      .mobile-remove {
        background: #fff;
        color: #E1519F;
      }

      button {
        background: #E1519F;
        border: 2px solid #E1519F;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
        font: inherit;
        flex: 1;
        margin-right: 10px;
        padding: 8px 0 8px 0;
        width: 90px;

        &:last-child {
          margin: 0;
        }
      }
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