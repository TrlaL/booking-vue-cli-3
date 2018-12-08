<template>
  <transition name="fade">
    <div class="activities-filters" v-show="isFiltersOpened">
      <div class="columns">
        <div class="column">
          <div class="filter">
            <div class="title">When would you like to go?</div>
            <Calendar v-model="timeStamp" @input="setDate" />
          </div>
          <div class="filter">
            <div class="line">
              <div>{{ translateHour(time[0]) }}</div>
              <div>{{ translateHour(time[1]) }}</div>
            </div>
            <Slider ref="timeSlider" v-bind="timeSliderOptions" v-model="time" @callback="setTime" />
          </div>
          <div class="filter">
            <div class="title">Select activity type(s):</div>
            <div class="line">
              Academic / Educational
              <Checkbox size="20" :value="1" v-model="categories" />
            </div>
            <div class="line">
              Creative / Artistic
              <Checkbox size="20" :value="2" v-model="categories" />
            </div>
            <div class="line">
              Physical / Athletic
              <Checkbox size="20" :value="3" v-model="categories" />
            </div>
            <div class="line">
              Entertainment
              <Checkbox size="20" :value="4" v-model="categories" />
            </div>
          </div>
        </div>
        <div class="column">
          <div class="filter">
            <div class="title">Kid(s) age?</div>
            <AgesTable v-model="age" @input="setAge" />
          </div>
          <div class="filter">
            <div class="title">Price:</div>
            <div class="line">
              <div>${{ price[0] }}</div>
              <div>${{ price[1] }}</div>
            </div>
            <Slider ref="priceSlider" v-bind="priceSliderOptions" v-model="price" @callback="setPrice" />
            <a class="reset-price" @click="resetPrice">No Limit</a>
          </div>
          <div class="filter">
            <div class="title">Additional filters:</div>
            <div class="line">
              Caregiver must be present
              <Checkbox size="20" v-model="onlyWithParents" @input="setAdditional('onlyWithParents')" />
            </div>
            <div class="line">
              Sleepaway camps only
              <Checkbox size="20" v-model="onlyOvernightCamp" @input="setAdditional('onlyOvernightCamp')" />
            </div>
            <div class="line">
              Weekend activities only
              <Checkbox size="20" v-model="onlyWeekend" @input="setAdditional('onlyWeekend')" />
            </div>
          </div>
        </div>
        <div class="column">
          <div class="filter">
            <div class="title">Select location/neighborhood(s):</div>
            <DropDownList
              v-for="(city, i) in cities"
              :id="1"
              :items="districts"
              :key="i"
              :title="city.title"
              @changed="locationChange"
            />
          </div>
        </div>
      </div>
      <div class="buttons">
        <button @click="apply">Apply</button>
        <a @click="cancel">Cancel</a>
      </div>
    </div>
  </transition>
</template>

<script>
import AgesTable from '../filters/AgesTable'
import Calendar from '../filters/Calendar'
import Checkbox from '../common/Checkbox'
import DropDownList from '../filters/DropDownList'
import Slider from 'vue-slider-component'
import { getCities, getDistricts } from '@/api/helpers'

export default {
  components: { AgesTable, Calendar, Checkbox, DropDownList, Slider },
  data () {
    return {
      age: null,
      categories: [1, 2, 3, 4],
      regionId: 5060716,
      cities: [],
      districts: [],
      filters: {},
      onlyWithParents: false,
      onlyOvernightCamp: false,
      onlyWeekend: false,
      price: [0, 200],
      sliderOptions: {
        bgStyle: {
          background: '#ccc'
        },
        processStyle: {
          background: '#D9429F'
        },
        dotSize: 20,
        enableCross: false,
        height: 5,
        tooltip: false,
        tooltipMerge: true
      },
      time: [8, 20],
      timeStamp: null
    }
  },
  computed: {
    isFiltersOpened () {
      return this.$store.getters.isFiltersOpened
    },
    priceSliderOptions () {
      return {
        ...this.sliderOptions,
        min: 0,
        max: 200
      }
    },
    timeSliderOptions () {
      return {
        ...this.sliderOptions,
        min: 8,
        max: 20
      }
    }
  },
  watch: {
    categories (array) {
      this.filters.categories = array
    },
    isFiltersOpened (value) {
      if (!value) return
      let timer = setTimeout(() => {
        this.$refs.timeSlider.refresh()
        this.$refs.priceSlider.refresh()
        clearTimeout(timer)
      }, 100)
    }
  },
  created () {
    this.getCities(this.regionId)
    this.getDistricts(this.regionId)
  },
  methods: {
    async getCities (id) {
      let response = await getCities(id)
      if (response.data.result) {
        this.cities = response.data.items
      }
    },
    async getDistricts (id) {
      let response = await getDistricts(id)
      if (response.data.result) {
        this.districts = response.data.items
      }
    },
    apply () {
      this.$store.commit('SET_FILTERS_OPENED', false)
      this.$store.commit('SET_FILTERS', this.filters)
    },
    cancel () {
      this.filters = {}
      this.age = null
      this.categories = [1, 2, 3, 4]
      this.onlyWithParents = false
      this.onlyOvernightCamp = false
      this.onlyWeekend = false
      this.price = [0, 200]
      this.time = [8, 20]
      this.timeStamp = null
      this.$store.commit('SET_FILTERS', {})
      this.$store.commit('SET_FILTERS_OPENED', false)
    },
    locationChange (items) {
      if (items.length) {
        this.filters.cityId = this.regionId
        this.filters.districtId = items.map(item => item.id)
      } else {
        delete this.filters.cityId
        delete this.filters.districtId
      }
    },
    resetPrice () {
      this.price = [0, 200]
      delete this.filters.priceFrom
      delete this.filters.priceTo
    },
    translateHour (hour) {
      if (hour >= 12 && hour <= 23) {
        hour = (hour - 12 === 0) ? 12 + ':00 AM' : hour - 12 + ':00 PM'
      } else {
        hour = hour + ':00 AM'
      }
      return hour
    },
    setAge () {
      if (!this.age) return delete this.filters.age
      this.filters.age = this.age
    },
    setAdditional (additional) {
      let currentValue = this[additional]
      if (currentValue) {
        this.filters[additional] = true
      } else {
        delete this.filters[additional]
      }
    },
    setDate () {
      if (!this.timeStamp) return delete this.filters.scheduleFrom
      let date = new Date(this.timeStamp)
      this.filters.scheduleFrom = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    },
    setPrice () {
      this.filters.priceFrom = this.price[0]
      this.filters.priceTo = this.price[1]
    },
    setTime () {
      this.filters.timeStartFrom = this.translateHour(this.time[0])
      this.filters.timeStartTo = this.translateHour(this.time[1])
    }
  }
}
</script>

<style lang="scss" scoped>
.columns {
  background: #fff;
  display: flex;
  user-select: none;
}

.column {
  flex: 1;
  margin: 0 120px 80px 0;

  &:last-child {
    margin: 0;
  }

  .filter {
    margin-bottom: 40px;

    &:last-child {
      margin: 0;
    }
  }

  .title {
    color: #4F4F4F;
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .line {
    color: #4F4F4F;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    &:last-child {
      margin: 0;
    }
  }

  .reset-price {
    color: #828282;
    cursor: pointer;
    display: flex;
    font-size: 14px;
    justify-content: flex-end;
    margin-top: 5px;
  }
}

.buttons {
  margin-bottom: 20px;

  button {
    background: #D9429F;
    border: 0;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    margin-right: 30px;
    padding: 15px 40px 15px 40px;
  }

  a {
    color: #828282;
    cursor: pointer;
    font-size: 15px;
    text-decoration: underline;
  }
}

@include desktop {
  .activities-filters {
    margin-top: 40px;
  }
}

@include mobile {
  .activities-filters {
    border-top: 1px solid #ddd;
  }

  .columns {
    flex-direction: column;
    padding: 20px;
  }

  .column {
    margin: 0 0 40px 0;
  }

  .buttons {
    align-items: center;
    display: flex;
    margin: 20px;

    a, button {
      display: block;
      flex: 1;
      margin: 0;
      padding: 10px 0 10px 0;
      text-align: center;
    }
  }
}
</style>