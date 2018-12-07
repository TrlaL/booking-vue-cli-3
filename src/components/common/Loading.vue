<template>
  <div class="loading">
    <img :src="require(`@/assets/images/${image}`)">
  </div>
</template>

<script>
export default {
  props: {
    size: { default: 'big', type: String }
  },
  data () {
    return {
      images: {
        small: 'loading-small.gif',
        big: 'loading-big.gif'
      }
    }
  },
  computed: {
    image () {
      return this.images[this.size]
    }
  }
}
</script>