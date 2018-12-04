<template>
  <div class="booking-item">
    <img class="image" :src="iconSrc">
    <div class="name">
      <div>{{ person.fullName }}</div>
      <div>{{ isChild ? 'Kid' : 'Caregiver' }}</div>
    </div>
    <div class="controls">
      <Switcher v-model="isActive" @input="handle" />
      <div class="price">${{ price }}</div>
    </div>
  </div>
</template>

<script>
import Switcher from '../common/Switcher'

export default {
  components: {
    Switcher
  },
  props: {
    person: {
      required: true,
      type: Object
    },
    price: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    iconSrc () {
      return this.person.photoLink || require(`@/assets/images/user-gray.svg`)
    },
    isChild () {
      return this.person.isChild
    }
  },
  methods: {
    handle () {
      this.$emit('changePerson', this.person.id, this.isActive)
    }
  }
}
</script>

<style lang="scss" scoped>
.booking-item {
  align-items: center;
  display: flex;
  margin-bottom: 20px;
}

.image {
  background: #ddd;
  border-radius: 100%;
  margin-right: 15px;
  height: 60px;
  object-fit: contain;
  width: 60px;
}

.name {
  flex: 1;
  line-height: 22px;

  div:first-child {
    color: #463A3E;
    font-size: 16px;
    font-weight: 400;
  }

  div:last-child {
    color: #918A8C;
    font-size: 13px;
  }
}

.controls {
  color: #918A8C;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
}
</style>