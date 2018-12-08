<template>
  <div class="activities-types">
    <div
      class="item"
      v-for="(item, i) in items"
      :class="className(i)"
      :key="i"
      @click="select(i)"
    >{{ item }}</div>
  </div>
</template>

<script>
export default {
  props: {
    isLoaded: { required: true, type: Boolean }
  },
  data () {
    return {
      items: ['DROP-INS', 'SEMESTERS', 'CAMPS'],
      selected: 0
    }
  },
  methods: {
    className (index) {
      return {
        selected: index === this.selected
      }
    },
    select (index) {
      if (!this.isLoaded) return
      this.selected = index
      this.$emit('changeType', index + 1)
    }
  }
}
</script>

<style lang="scss" scoped>
@include desktop {
  .activities-types {
    display: flex;
    padding: 15px 0 15px 0;
    user-select: none;

    .item {
      color: #E1519F;
      cursor: pointer;
      flex: 1;
      font-size: 22px;
      font-weight: 300;
      text-align: center;
    }

    .item.selected {
      font-weight: bold;
      text-decoration: underline;
    }
  }
}

@include mobile {
  .activities-types {
    background: #eee;
    border-top: 1px solid #ddd;
    display: flex;
    user-select: none;

    .item {
      border-bottom: 2px solid transparent;
      color: #918A8C;
      cursor: pointer;
      flex: 1;
      padding: 10px 0 10px 0;
      text-align: center;
    }

    .item.selected {
      border-color: #E1519F;
      color: #E1519F;
    }
  }
}
</style>