<template>
  <div class="counter">
    <div class="item" :style="styles" @click="handle(-1)">-</div>
    <div class="item value" :style="styles">{{ val }}</div>
    <div class="item" :style="styles" @click="handle(1)">+</div>
  </div>
</template>

<script>
export default {
  props: {
    font: {
      default: '20',
      type: String
    },
    size: {
      default: '30',
      type: String
    },
    value: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
      val: this.value
    }
  },
  computed: {
    styles () {
      return {
        fontSize: this.font + 'px',
        height: this.size + 'px',
        width: this.size + 'px'
      }
    }
  },
  methods: {
    handle (val) {
      this.val = (this.val + val < 0) ? 0 : this.val + val
      this.$emit('input', this.val)
    }
  }
}
</script>

<style lang="scss" scoped>
.counter {
  color: #828282;
  display: flex;
  user-select: none;
}

.item {
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    background: #eee;
  }
}

.value {
  background: none !important;
  color: #463A3E;
}
</style>