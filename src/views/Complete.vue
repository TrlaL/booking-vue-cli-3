<template>
  <div class="container">
    <Navigation />
    <div class="box">
      <img class="icon" src="@/assets/images/success.svg">
      <div class="content">
        <div class="title">Booked!</div>
        <div class="text">You can see all your upcoming activities in your “I’m Going’ folder</div>
        <div class="hint">Friends don’t let friends miss out on amazing activities!<br><b>Share the fun.</b></div>
        <div class="icons">
          <img src="@/assets/images/facebook.svg">
          <img src="@/assets/images/twitter.svg">
          <img src="@/assets/images/mail.svg">
        </div>
        <div class="form">
          <input type="text" value="https://LINK TO ACTIVITY">
          <span>Or copy & share link above</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/common/Navigation'

export default {
  components: {
    Navigation
  },
  computed: {
    isBookingComplete () {
      return this.$store.getters.isBookingComplete
    }
  },
  created () {
    if (!this.isBookingComplete) return this.$router.push('/')
    this.$store.commit('SET_BOOKING_STATUS', false)
  }
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  margin-bottom: 100px;
  margin-top: 40px;
  max-width: 600px !important;
  padding-top: 60px;
}

.icon {
  margin-bottom: 35px;
}

.content {
  margin: auto;
  margin-bottom: 50px;
  max-width: 70%;
  text-align: center;

  .title {
    color: #463A3E;
    font-size: 20px;
  }

  .text {
    color: #4F4F4F;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 35px;
  }

  .hint {
    color: #D9429F;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 50px;
  }

  .icons img {
    cursor: pointer;
    margin-right: 35px;

    &:last-child {
      margin: 0;
    }
  }

  .form {
    margin-top: 35px;

    input {
      border: 0;
      border-bottom: 1px solid #777;
      color: #828282;
      font: inherit;
      font-size: 14px;
      text-align: center;
      width: 100%;
    }

    span {
      color: #D9429F;
      font-size: 14px;
    }
  }
}

@include mobile {
  .box {
    border-top: 1px solid #ddd;
    box-shadow: none;
    margin: 0;
    margin: auto;
    max-width: 100% !important;
    padding-top: 20px;
  }

  .icon {
    margin-bottom: 20px;
  }

  .form {
    margin-top: 20px;
  }

  .icons img {
    margin-right: 5px !important;

    &:last-child {
      margin: 0 !important;
    }
  }
}
</style>