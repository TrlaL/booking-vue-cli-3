<template>
  <div class="checkbox" @click="click">
    <button class="button" :class="buttonClasses" :style="styles"></button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    checked: null,
    size: {
      default: '10',
      type: String
    },
    value: null
  },
  computed: {
    buttonClasses () {
      return {
        checked: this.isChecked,
        margin: this.hasSlot
      }
    },
    hasSlot () {
      return this.$slots.default
    },
    isArray () {
      return Array.isArray(this.checked)
    },
    isChecked () {
      return this.isArray ? this.checked.includes(this.value) : this.checked
    },
    styles () {
      return {
        height: this.size + 'px',
        width: this.size + 'px'
      }
    }
  },
  methods: {
    click () {
      let checked = !this.checked
      if (this.isArray) {
        checked = [].concat(this.checked)
        if (checked.includes(this.value)) {
          checked.splice(checked.indexOf(this.value), 1)
        } else {
          checked.push(this.value)
        }
      }
      this.$emit('input', checked)
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 13px;
  user-select: none;
}

.button {
  background: #e0e0e0;
  border: 0;
  border-radius: 100%;
  cursor: pointer;
  height: 10px;
  padding: 0;
  width: 10px;
}

.checked {
  background: #E1519F;
}

.margin {
  margin-right: 5px;
}
</style>