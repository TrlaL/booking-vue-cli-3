<template>
  <div class="app" @click="handle">
    <Header />
    <router-view :key="$route.path" />
    <Footer />
  </div>
</template>

<script>
import Footer from './components/common/Footer'
import Header from './components/common/Header'

export default {
  components: { Footer, Header },
  methods: {
    handle () {
      this.$store.commit('SET_MENU_LIST_VISIBLE', false)
    }
  }
}
</script>

<style>
@import './assets/scss/poppins.scss';
@import './assets/scss/general.scss';
@import './assets/scss/animations.scss';
</style>