<template>
  <div class="drop-down-list">
    <div class="header">
      <div class="title" @click="toggle">
        {{ title }}
        <img :src="require(`@/assets/images/${iconSrc}`)">
      </div>
      <Checkbox size="20" @input="toggleAllItems" v-model="commonCheckbox" />
    </div>
    <div class="items" v-show="isOpened">
      <div class="line" :key="i" v-for="(item, i) in items">
        <div class="item">{{ item }}</div>
        <Checkbox size="20" @input="toggleItem" v-model="selected[i]" />
      </div>
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
    id: {
      required: true,
      type: Number
    },
    title: {
      required: true,
      type: String
    },
    items: {
      required: true,
      type: Array
    },
    opened: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      commonCheckbox: false,
      selected: []
    }
  },
  computed: {
    iconSrc () {
      return this.isOpened ? 'arrow-top.svg' : 'arrow-bottom.svg'
    },
    isOpened () {
      return this.openedId === this.id
    },
    openedId () {
      return this.$store.getters.openedDropDownId
    }
  },
  created () {
    this.selected = new Array(this.items.length).fill(false)
    if (this.opened) {
      this.$store.commit('SET_OPENED_DROP_DOWN_ID', this.id)
    }
  },
  methods: {
    emit () {
      this.$emit('changed', this.items.filter((item, index) => this.selected[index]))
    },
    toggle () {
      this.$store.commit('SET_OPENED_DROP_DOWN_ID', this.isOpened ? 0 : this.id)
    },
    toggleItem () {
      let check = this.selected.find(item => item === false)
      this.commonCheckbox = check === undefined
      this.emit()
    },
    toggleAllItems () {
      this.selected.fill(this.commonCheckbox)
      this.emit()
    }
  }
}
</script>

<style lang="scss" scoped>
.drop-down-list {
  color: #4F4F4F;
  user-select: none;
}
.header {
  display: flex;
  height: 50px;
  .title {
    align-items: center;
    border-bottom: 1px solid #aaa;
    cursor: pointer;
    display: flex;
    flex: 1;
    font-size: 13px;
    font-weight: 700;
    justify-content: space-between;
    margin-right: 20px;
    padding: 10px 0 10px 0;
  }
}
.items {
  font-size: 12px;
  .line {
    display: flex;
  }
  .item {
    flex: 1;
    margin-right: 20px;
    padding: 12px 0 12px 0;
  }
}
</style>