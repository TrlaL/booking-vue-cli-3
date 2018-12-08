<template>
  <div class="activities-list">
    <div class="list" v-if="items.length">
      <ActivitiesItem
        class="item"
        v-for="(item, i) in items"
        :key="i"
        :item="item"
        @toggleFavorite="toggleFavorite"
      />
    </div>
    <div class="empty" v-else-if="isLoaded && !items.length">It's empty here</div>
  </div>
</template>

<script>
import ActivitiesItem from './ActivitiesItem'

export default {
  components: { ActivitiesItem },
  props: {
    isLoaded: { required: true, type: Boolean },
    items: { required: true, type: Array }
  },
  methods: {
    toggleFavorite (state) {
      this.$emit('toggleFavorite', state)
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