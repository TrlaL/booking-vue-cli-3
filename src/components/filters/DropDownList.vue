<template>
  <div class="drop-down-list">
    <div class="title">
      <Checkbox class="checkbox" size="20" v-model="toggler" />
      <div class="line" @click="toggle">
        {{ title }}
        <img :src="require(`@/assets/images/${icon}`)">
      </div>
    </div>
    <div class="items" v-show="opened">
      <Checkbox
        class="item"
        margin="20"
        size="20"
        v-for="item in items"
        v-model="selectedItems"
        :value="item"
      >{{ item.title }}</Checkbox>
    </div>
  </div>
</template>

<script>
import Checkbox from '../common/Checkbox'

export default {
  components: {
    Checkbox
  },
  props: {
    items: {
      required: true,
      type: Array
    },
    title: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      opened: false,
      selectedItems: [],
      toggler: false
    }
  },
  computed: {
    icon () {
      return this.opened ? 'arrow-top.svg' : 'arrow-bottom.svg'
    }
  },
  methods: {
    toggle () {
      this.opened = !this.opened
    }
  },
  watch: {
    selectedItems (items) {
      this.$emit('changed', items)
    },
    toggler (value) {
      this.selectedItems = (value) ? this.items : []
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