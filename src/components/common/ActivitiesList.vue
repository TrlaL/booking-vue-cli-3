<template>
  <div class="activities-list">
    <div class="list" v-if="items.length">
      <Activity class="item" v-for="(item, i) in items" :key="i" :item="item" />
    </div>
    <div class="empty" v-else-if="isLoadedItems && !items.length">It's empty here</div>
  </div>
</template>

<script>
import Activity from './Activity'

export default {
  components: { Activity },
  props: {
    items: { required: true, type: Array }
  },
  computed: {
    isLoadedItems () {
      return this.$store.getters.isLoadedItems
    }
  }
}
</script>

<style lang="scss" scoped>
.empty {
  background: #fff !important;
  padding: 10px;
  text-align: center;
}

@include desktop {
  .activities-list {
    padding: 0 15px 0 15px;
  }

  .item {
    border-radius: 5px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
    margin-bottom: 15px;
  }

  .item:last-child {
    margin: 0;
  }
}

@include mobile {
  .box {
    all: unset;
  }

  .activities-list {
    background: #eee;
  }

  .item {
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
    margin-bottom: 10px;
  }

  .item:last-child {
    margin: 0;
  }
}
</style>