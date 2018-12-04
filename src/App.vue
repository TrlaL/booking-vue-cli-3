<template>
  <div class="app">
    <Header />
    <transition mode="out-in" name="fade">
      <router-view :key="$route.path" />
    </transition>
    <Footer />
  </div>
</template>

<script>
import Footer from './components/common/Footer'
import Header from './components/common/Header'

export default {
  components: {
    Footer,
    Header
  }
}
</script>

<style>
@import './assets/scss/poppins.scss';
@import './assets/scss/general.scss';
@import './assets/scss/animations.scss';
</style>