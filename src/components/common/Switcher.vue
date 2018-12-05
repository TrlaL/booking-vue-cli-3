<template>
  <div class="switcher" :class="className" @click="toggle"></div>
</template>

<script>
export default {
  props: {
    value: { default: false, type: Boolean }
  },
  data () {
    return {
      active: this.value
    }
  },
  computed: {
    className () {
      return {
        active: this.active
      }
    }
  },
  methods: {
    toggle () {
      this.active = !this.active
      this.$emit('input', this.active)
    }
  }
}
</script>

<style lang="scss" scoped>
.switcher {
  background: #E3E0E1;
  border-radius: 11px;
  cursor: pointer;
  height: 22px;
  padding: 5px;
  position: relative;
  width: 46px;
}

.switcher::after {
  background: #fff;
  border-radius: 100%;
  content: '';
  display: block;
  height: 12px;
  width: 12px;
}

.active {
  background: #9BE151;
}

.active::after {
  position: absolute;
  right: 5px;
}
</style>