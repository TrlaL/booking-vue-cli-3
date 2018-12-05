<template>
  <div class="booking-item">
    <img class="image" :src="iconSrc">
    <div class="name">
      <input placeholder="Enter Full Name" type="text" v-if="person.isNew" v-model="person.fullName" @input="handle">
      <div v-else>{{ person.fullName }}</div>
      <div>{{ person.isChild ? 'Kid' : 'Caregiver' }}</div>
    </div>
    <div class="controls">
      <Switcher v-model="person.isActive" @input="handle" />
      <div class="price">${{ price }}</div>
    </div>
  </div>
</template>

<script>
import Switcher from '../common/Switcher'

export default {
  components: { Switcher },
  props: {
    person: { required: true, type: Object },
    price: { default: 0, type: Number }
  },
  computed: {
    iconSrc () {
      return this.person.photoLink || require(`@/assets/images/user-gray.svg`)
    }
  },
  created () {
    this.person.isActive = false
  },
  methods: {
    handle () {
      this.$emit('changePerson', this.person, this.index)
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

  input {
    border: 0;
    border-bottom: 1px solid #D4D4D4;
    color: #4F4F4F;
    font: inherit;
    margin-bottom: 4px;
    padding: 5px 0 5px 0;
  }

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