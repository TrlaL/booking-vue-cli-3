<template>
  <div class="ages-table">
    <div
      class="item"
      v-for="(item, i) in items"
      :class="selectedClass(i)"
      :key="i"
      @click="setItem(i)"
    >{{ item.name }}</div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      items: [
        { name: 'UNDER 1', value: '<1' },
        { name: '1', value: '1' },
        { name: '2', value: '2' },
        { name: '3', value: '3' },
        { name: '4', value: '4' },
        { name: '5', value: '5' },
        { name: '6', value: '6' },
        { name: '7', value: '7' },
        { name: '8', value: '8' },
        { name: '9', value: '9' },
        { name: '10', value: '10' },
        { name: '11', value: '11' },
        { name: '12', value: '12' },
        { name: '13', value: '13' },
        { name: '14+', value: '14<' },
        { name: 'Caregivers', value: 'caregiver' }
      ],
      selected: null
    }
  },
  watch: {
    value (val) {
      if (val !== null) return
      this.selected = null
    }
  },
  methods: {
    selectedClass (i) {
      return {
        selected: i === this.selected
      }
    },
    setItem (i) {
      this.selected = (this.selected === i) ? null : i
      this.$emit('input', this.selected !== null ? this.items[i].value : null)
    }
  }
}
</script>

<style lang="scss" scoped>
.ages-table {
  color: #4F4F4F;
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  word-spacing: 1000px;
}

.item {
  align-items: center;
  border: 1px solid #BDBDBD;
  border-radius: 5px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: flex;
  height: 45px;
  justify-content: center;
  margin-bottom: 5px;
  margin-right: 5px;
  width: calc(1 / 4 * 100% - (1 - 1 / 4) * 5px);

  &.selected {
    background: #D9429F !important;
    color: #fff;
  }

  &:hover {
    background: #eee;
  }

  &:last-child {
    font-size: 11px;
  }

  &:nth-child(4n) {
    margin-right: 0;
  }

  &:nth-last-child(-n + 4) {
    margin-bottom: 0;
  }
}
</style>