<template>
  <div class="navigation">
    <div class="back">
      <img src="@/assets/images/arrow-left.svg">
      <router-link to="/">Back to Home</router-link>
    </div>
    <div class="title">{{ title }}</div>
    <MenuButton />
  </div>
</template>

<script>
import MenuButton from '../common/MenuButton'

export default {
  components: {
    MenuButton
  },
  computed: {
    title () {
      return this.$route.meta.title
    }
  }
}
</script>

<style lang="scss" scoped>
@include desktop {
  .navigation {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 65px;
  }

  .back {
    align-items: center;
    color: #828282;
    display: flex;
    flex: 1;
    max-width: 250px;

    a {
      color: inherit;
      text-decoration: none;
    }

    img {
      margin-right: 5px;
    }
  }

  .title {
    color: #BDBDBD;
    flex: 1;
    font-size: 20px;
    font-weight: 300;
    max-width: 250px;
    text-align: center;
  }
}

@include mobile {
  .navigation {
    display: none;
  }
}
</style>