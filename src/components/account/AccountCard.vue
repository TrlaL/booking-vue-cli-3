<template>
  <div class="account-card">
    <img class="icon" src="@/assets/images/payment.svg">
    <div class="forms">
      <div>
        <label>Credit Card Number</label>
        <input
          name="number"
          placeholder="************1234"
          type="text"
          v-validate="'required|min:16'"
          v-model="card.number"
        >
      </div>
      <div>
        <label>Experation Date</label>
        <input
          name="expireDate"
          placeholder="MM/YYYY"
          type="text"
          v-validate="'required|date_format:MM/YYYY'"
          v-model="card.expireDate"
        >
      </div>
      <div>
        <label>CVV</label>
        <input
          name="cvv"
          placeholder="123"
          type="text"
          v-validate="'required|numeric|min:3|max:4'"
          v-model="card.cvv"
        >
      </div>
    </div>
    <div class="buttons">
      <button @click="handle">{[ buttonText }}</button>
      <template v-if="!card.isNew">
        <button class="mobile-remove" @click="$emit('deleteCard', card.id)">Remove</button>
        <img class="desktop-remove" src="@/assets/images/reset.svg" @click="$emit('deleteCard', card.id)">
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: { required: true, type: Object }
  },
  computed: {
    buttonText () {
      return this.card.isNew ? 'Save' : 'Update'
    }
  },
  methods: {
    handle () {
      this.$validator.validateAll().then(checked => {
        if (checked) return this.$emit('handleCard', this.card)
        this.$emit('handleError', 'The data for the card is not valid!')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@include desktop {
  .account-card {
    align-items: center;
    display: flex;
    margin-bottom: 25px;
  }

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
      color: #888;
      font-size: 14px;
    }

    input {
      border: 0;
      border-bottom: 1px solid #D4D4D4;
      color: #4F4F4F;
      font: inherit;
      padding: 7px 0 7px 0;
      width: 100%;

      &::placeholder {
        color: #aaa;
      }
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

@include mobile {
 .account-card {
    border-bottom: 2px solid #ddd;
    padding: 20px;

    &:last-child {
      border-bottom: 0;
    }
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
      color: #888;
      font-size: 14px;
    }

    input {
      border: 0;
      border-bottom: 1px solid #D4D4D4;
      color: #4F4F4F;
      font: inherit;
      padding: 7px 0 7px 0;
      width: 100%;

      &::placeholder {
        color: #aaa;
      }
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
</style>