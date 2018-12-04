<template>
  <Modal id="account-modal" @changedVisible="changedVisible">
    <div class="content">
      <template v-if="!message">
        <label class="label">Your Promocode:</label>
        <input class="code" type="text" v-model="code">
        <button class="activate" @click="activatePromocode">Activate</button>
      </template>
      <div class="message" v-else>{{ message }}</div>
    </div>
  </Modal>
</template>

<script>
import Modal from '../common/Modal'
import { activatePromocode } from '@/api/profile'

export default {
  components: {
    Modal
  },
  data () {
    return {
      code: '',
      message: ''
    }
  },
  methods: {
    async activatePromocode () {
      let response = await activatePromocode(this.code)
      this.message = response.data.message
    },
    changedVisible () {
      this.code = ''
      this.message = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 17px;
  margin-bottom: 10px;
}

.code {
  border: 1px solid #D4D4D4;
  font: inherit;
  margin-bottom: 10px;
  padding: 8px 3px 8px 3px;
}

.activate {
  background: #2F80ED;
  border: 0;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 18px;
  font-weight: 500;
  padding: 10px;
}
</style>