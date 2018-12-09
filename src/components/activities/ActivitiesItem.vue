<template>
  <div class="activities-item">
    <div class="desktop">
      <div class="front-image">
        <img :src="frontImage">
      </div>
      <div class="section">
        <div class="title">{{ item.name }}</div>
        <div class="table">
          <span>{{ item.scheduleFrom }}</span>
          <span>Ages: {{ ageFrom }} - {{ ageTo }}</span>
          <span>Time: {{ startTime }} - {{ endTime }}</span>
          <span>Provided by: <u class="bold">{{ item.merchantName }}</u></span>
        </div>
        <div class="place">
          <img class="icon" src="@/assets/images/place.svg">
          {{ item.address }}
        </div>
      </div>
      <div class="controls">
        <div class="icons">
          <img src="@/assets/images/share.svg">
          <img @click="toggleFavorite" :src="require(`@/assets/images/${favoriteIcon}`)">
        </div>
        <div class="price">${{ item.price }}</div>
        <button class="book" @click="handleButton">{{ buttonText }}</button>
        <div class="seats">
          <a v-if="isPage('going')" @click="cancelBooking">Cancel Activity</a>
          <div v-else>Seats Left: {{ seatsLeft }}</div>
        </div>
      </div>
    </div>
    <div class="mobile">
      <div class="front">
        <img class="image" :src="frontImage">
        <div class="provided">Provided by: {{ item.merchantName }}</div>
        <div class="date">{{ item.scheduleFrom }}<br>{{ startTime }} to {{ endTime }}</div>
        <div class="price" @click="handleButton">${{ item.price }}</div>
      </div>
      <div class="section">
        <div class="info">
          <div class="title">{{ item.name }}</div>
          <div>Ages: {{ ageFrom }} - {{ ageTo }}</div>
          <div>Seats left: {{ seatsLeft }}</div>
        </div>
        <div class="arrow">
          <img src="@/assets/images/arrow-right.svg">
        </div>
      </div>
      <div class="place">
        <div class="target">
          <img class="icon" src="@/assets/images/place.svg">
          <div class="address">{{ item.address }}</div>
        </div>
        <div class="icons">
          <img src="@/assets/images/close.svg" v-if="isPage('going')" @click="cancelBooking">
          <img src="@/assets/images/share.svg">
          <img @click="toggleFavorite" :src="require(`@/assets/images/${favoriteIcon}`)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setFavorite, unsetFavorite } from '@/api/favorites'

export default {
  props: {
    item: { required: true, type: Object },
    type: { required: true, type: String }
  },
  computed: {
    ageFrom () {
      return this.item.ageMonthFrom ? this.item.ageMonthFrom + ' months' : this.item.ageFrom + ' year'
    },
    ageTo () {
      return this.item.ageMonthTo ? this.item.ageMonthTo + ' months' : this.item.ageTo + ' year'
    },
    buttonText () {
      return this.isPage('activities') ? 'Book' : 'View'
    },
    endTime () {
      return this.getHours(new Date(this.item.endDateTime))
    },
    favoriteIcon () {
      return this.item.isFavorite ? 'my-favorite.svg' : 'favorite.svg'
    },
    frontImage () {
      return this.item.photos ? this.item.photos[0] : ''
    },
    seatsLeft () {
      return this.item.hasOwnProperty('seatsLeft') ? this.item.seatsLeft[0].spotsLeft : 0
    },
    startTime () {
      return this.getHours(new Date(this.item.startDateTime))
    }
  },
  methods: {
    async setFavorite (id, date) {
      let response = await setFavorite(id, date)
      if (response.data.result) this.$emit('toggleFavorite', true)
    },
    async unsetFavorite (id, date) {
      let response = await unsetFavorite(id, date)
      if (response.data.result) this.$emit('toggleFavorite', false)
    },
    cancelBooking () {
      this.$emit('cancelBooking', this.item.id)
    },
    getHours (date) {
      return date.toLocaleString('en-US', { hour: 'numeric', hour12: true })
    },
    handleButton () {
      if (this.isPage('activities')) return this.$router.push(`/booking/${this.item.id}`)
      alert('view')
    },
    isPage (page) {
      return this.type === page
    },
    toggleFavorite () {
      this.item.isFavorite = !this.item.isFavorite
      if (this.item.isFavorite) {
        this.setFavorite(this.item.id)
      } else {
        this.unsetFavorite(this.item.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@include desktop {
  .desktop {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    display: flex;
    min-width: 900px;
  }

  .front-image {
    background: #eee;
    border-radius: 5px 0 0 5px;
    height: 200px;
    width: 350px;

    img {
      border-radius: inherit;
      height: 100%;
      width: 100%;
    }
  }

  .bold {
    font-weight: bold;
    margin-left: 5px;
  }

  .section {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px 15px 15px 50px;
  }

  .title {
    color: #6B3C96;
    font-size: 22px;
    font-weight: 510;
    text-decoration: underline;
  }

  .table {
    color: #4F4F4F;
    display: flex;
    flex-wrap: wrap;
    font-size: 15px;
    line-height: 30px;

    span {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 50%;
    }
  }

  .place {
    align-items: center;
    color: #828282;
    display: flex;
    font-size: 12px;

    .icon {
      margin-right: 10px;
    }
  }

  .controls {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px 15px 15px 0;

    a {
      color: #828282;
      cursor: pointer;
      font-size: 12px;
      text-decoration: underline;
    }

    .icons {
      display: flex;
      justify-content: space-around;

      img {
        cursor: pointer;
      }
    }

    .price,
    .seats {
      color: #828282;
      font-size: 15px;
      font-weight: 300;
      text-align: center;
    }

    .book {
      background: #56CCF2;
      border: 0;
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
      font-size: 15px;
      padding: 10px 0 10px 0;
      text-align: center;
      width: 100px;
    }
  }

  .mobile {
    display: none;
  }
}

@include mobile {
  .mobile {
    background: #fff;
    display: flex;
    flex-direction: column;
  }

  .front {
    height: 230px;
    position: relative;

    &::after {
      background: rgba(0, 0, 0, 0.2);
      content: '';
      display: block;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }

    .image {
      height: 100%;
      object-fit: fill;
      position: relative;
      width: 100%;
    }

    .provided {
      color: #fff;
      font-weight: 500;
      max-width: 70%;
      position: absolute;
      right: 15px;
      text-align: right;
      top: 15px;
      z-index: 10;
    }

    .date {
      bottom: 15px;
      color: #fff;
      font-size: 18px;
      font-weight: 600;
      position: absolute;
      left: 15px;
      z-index: 10;
    }

    .price {
      background: #56CCF2;
      border-radius: 25px 0 0 25px;
      bottom: 15px;
      color: #fff;
      cursor: pointer;
      padding: 7px 25px 7px 35px;
      position: absolute;
      right: 0;
      z-index: 10;
    }
  }

  .section {
    color: #463A3E;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 10px 20px;

    .title {
      font-size: 17px;
      font-weight: bold;
    }

    .arrow {
      align-items: center;
      cursor: pointer;
      display: flex;
    }
  }

  .place {
    align-items: center;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    color: #918A8C;
    display: flex;
    font-size: 12px;
    font-weight: 300;

    .target {
      align-items: center;
      display: flex;
      flex: 1;
      overflow: hidden;
      padding: 10px 0 10px 20px;

      .address {
        padding-right: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }

      img {
        margin-right: 5px;
      }
    }

    .icons {
      display: flex;

      img {
        border-left: 1px solid #ddd;
        cursor: pointer;
        padding: 10px;
      }
    }
  }

  .desktop {
    display: none;
  }
}
</style>