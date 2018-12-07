<template>
  <div class="drop-down-list">
    <div class="title">
      <Checkbox class="checkbox" size="20" v-model="toggler" />
      <div class="line" @click="toggle">
        {{ title }}
        <img :src="require(`@/assets/images/${icon}`)">
      </div>
    </div>
    <transition name="fade">
      <div class="items" v-show="visible">
        <Checkbox
          class="item"
          margin="20"
          size="20"
          v-for="(item, i) in items"
          v-model="selectedItems"
          :key="i"
          :value="item"
        >{{ item.title }}</Checkbox>
      </div>
    </transition>
  </div>
</template>

<script>
import Checkbox from '../common/Checkbox'

export default {
  components: { Checkbox },
  props: {
    id: { required: true, type: null },
    items: { required: true, type: Array },
    title: { required: true, type: String }
  },
  data () {
    return {
      selectedItems: [],
      toggler: false
    }
  },
  computed: {
    icon () {
      return this.visible ? 'arrow-top.svg' : 'arrow-bottom.svg'
    },
    openedId () {
      return this.$store.getters.openedDropDownId
    },
    visible () {
      return this.id === this.openedId
    }
  },
  watch: {
    selectedItems (items) {
      this.$emit('changed', items)
    },
    toggler (value) {
      this.selectedItems = (value) ? this.items : []
    }
  },
  methods: {
    toggle () {
      this.$store.commit('SET_OPENED_DROP_DOWN_ID', this.id === this.openedId ? null : this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.drop-down-list {
  color: #4F4F4F;
  font-size: 13px;
}

.checkbox {
  margin-right: 15px;
}

.title {
  align-items: center;
  border-bottom: 1px solid #bbb;
  cursor: pointer;
  display: flex;
  font-weight: 600;
  height: 50px;

  .line {
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding-right: 10px;
  }
}

.items {
  max-height: 300px;
  overflow-y: auto;

  .item {
    align-items: center;
    cursor: pointer;
    display: flex;
    padding: 9px 0 9px 0;
  }

  .content {
    flex: 1;
  }
}
</style>