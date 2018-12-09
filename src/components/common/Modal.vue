<template>
  <transition name="fade">
    <div class="modal" v-if="modalVisible">
      <div class="blackout" @click="handle(false)"></div>
      <div class="box">
        <div class="close" @click="handle(false)">
          <img class="close" src="@/assets/images/close.svg">
        </div>
        <div class="header" v-if="title">{{ title }}</div>
        <div class="content">
          <slot></slot>
          <div class="modal-buttons" v-show="buttons">
            <button class="fill" @click="handle(false)">NO</button>
            <button class="border" @click="handle(true)">YES</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    buttons: { default: false, type: Boolean },
    id: { required: true, type: String },
    title: { default: 'Modal Window', type: String }
  },
  computed: {
    modalVisible () {
      return this.$store.getters.modalVisible(this.id)
    }
  },
  watch: {
    modalVisible (value) {
      this.$emit('changedVisible', value)
    }
  },
  created () {
    this.$store.commit('SET_MODAL_VISIBLE', { id: this.id, visible: false })
  },
  methods: {
    handle (state) {
      this.$store.commit('SET_MODAL_VISIBLE', { id: this.id, visible: false })
      this.$emit('handle', state)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  align-items: center;
  display: flex;
  height: 100%;
  left: 0;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
}

.blackout {
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  height: 100%;
  position: absolute;
  width: 100%;
}

.box {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  margin: 10px;
  max-height: 75%;
  max-width: $modal-width;
  overflow-y: auto;
  padding: 25px 80px 25px 80px;
  position: relative;
  width: 100%;
  z-index: 1;
}

.close {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
}

.header {
  color: #3D3C3C;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
}

.content {
  color: #4F4F4F;
  font-size: 15px;
  line-height: 20px;
}

.modal-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;

  button {
    border-radius: 8px;
    border: 0;
    cursor: pointer;
    flex: 1;
    font-size: 18px;
    font-weight: medium;
    max-width: 49%;
    padding: 6px 0 6px 0;
  }

  .fill {
    background: #2F80ED;
    color: #fff;
  }

  .border {
    background: #fff;
    border: 2px solid #2F80ED;
    color: #2F80ED;
  }
}
</style>