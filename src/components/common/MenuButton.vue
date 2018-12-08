<template>
  <div class="menu-button" @click.stop="handle">
    <div class="desktop">
      <img class="icon" src="@/assets/images/user-gray.svg">
      <div class="current">MENU</div>
      <img class="icon" src="@/assets/images/arrow-bottom.svg">
    </div>
    <img class="icon mobile" src="@/assets/images/user-black.svg">
    <transition name="fade">
      <div class="list" v-show="menuListVisible">
        <div class="triangle"></div>
        <router-link to="/favorites">Favorites</router-link>
        <router-link to="/going">I’m Going</router-link>
        <router-link to="/past-booked">Past Booked</router-link>
        <router-link to="/family">My Family</router-link>
        <router-link to="/account">My Account</router-link>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    menuListVisible () {
      return this.$store.getters.menuListVisible
    }
  },
  methods: {
    handle () {
      this.$store.commit('SET_MENU_LIST_VISIBLE', !this.menuListVisible)
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  height: 30px;
  object-fit: contain;
  width: 30px;
}

.menu-button {
  cursor: pointer;
  position: relative;
}

.list {
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  font-size: 14px;
  min-width: 150px;
  position: absolute;
  right: 0;
  top: calc(100% + 2px);
  width: 100%;
  z-index: 100;

  a {
    color: #4F4F4F;
    display: block;
    padding: 10px 18px 10px 18px;
    text-decoration: none;
  }

  a:hover {
    background: #eee;
  }
}

@include desktop {
  .menu-button {
    user-select: none;
    width: 250px;
  }

  .desktop {
    align-items: center;
    border: 1px solid #D9429F;
    border-radius: 5px;
    color: #D9429F;
    display: flex;
    justify-content: space-between;
    padding: 5px 25px 5px 25px;
  }

  .mobile {
    display: none;
  }
}

@include mobile {
  .menu-button {
    align-items: center;
    cursor: pointer;
    display: flex;
    user-select: none;
  }

  .desktop {
    display: none;
  }

  .list {
    top: calc(100% + 10px);
  }

  .triangle {
    height: 30px;
    overflow: hidden;
    position: absolute;
    right: -2px;
    top: -30px;
    width: 30px;
  }

  .triangle:after {
    background: #fff;
    box-shadow: -2px -2px 2px rgba(0, 0, 0, 0.2);
    content: '';
    height: 15px;
    left: 5px;
    position: absolute;
    top: 25px;
    transform: rotate(45deg);
    width: 15px;
  }
}
</style>