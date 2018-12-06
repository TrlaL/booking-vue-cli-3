<template>
  <div class="booking-total">
    <div class="line">GoBambinoGives Fee<span>$0</span></div>
    <div class="line bold">Total:<span>${{ totalSum.toFixed(2) }}</span></div>
    <div class="form">
      <div class="card">
        <label>Credit Card Number</label>
        <input
          name="number"
          placeholder="************1234"
          type="text"
          v-validate="'required|min:16'"
        >
      </div>
      <div class="date">
        <label>Exp. Date</label>
        <input
          name="expireDate"
          placeholder="MM/YYYY"
          type="text"
          v-validate="'required|date_format:MM/YYYY'"
        >
      </div>
    </div>
    <Checkbox class="checkbox" v-model="checkbox">Save credit card for future bookings</Checkbox>
    <button class="button" @click="handle">Book</button>
  </div>
</template>

<script>
import Checkbox from '@/components/common/Checkbox'

export default {
  components: { Checkbox },
  props: {
    totalSum: { default: 0, type: Number }
  },
  data () {
    return {
      checkbox: false
    }
  },
  methods: {
    handle () {
      this.$validator.validateAll().then(checked => {
        if (checked) return this.$emit('book')
        this.$emit('handleError', 'You entered incorrect data!')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@include mobile {
  .booking-total {
    background: #eee;
    border-top: 1px solid #ddd;
    margin-top: 10px !important;
    padding: 20px;
  }
}

.booking-total {
  margin-top: 30px;
}

.line {
  color: #918A8C;
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  line-height: 35px;
}

.line.bold {
  color: #463A3E;
  font-weight: bold;
}

.form {
  display: flex;
  margin: 40px 0 11px 0;

  .card {
    flex: 2;
    margin-right: 20px;
  }

  .date {
    flex: 1;
  }

  label {
    color: #888;
    font-size: 15px;
  }

  input {
    border: 0;
    border-bottom: 1px solid #D4D4D4;
    box-sizing: border-box;
    padding: 7px 0 7px 0;
    width: 100%;

    &::placeholder {
      color: #aaa;
    }
  }
}

.checkbox {
  color: #888;
  font-size: 12px !important;
}

.button {
  background: #E1519F;
  border: 0;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  margin-top: 30px;
  padding: 15px 0 15px 0;
  width: 100%;

  &:disabled {
    background: #BDBDBD;
  }
}
</style>