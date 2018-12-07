<template>
  <div class="booking-person">
    <img class="image" :src="iconSrc">
    <div class="name">
      <input
        name="fullName"
        placeholder="Enter Full Name"
        type="text"
        v-validate="'required|min:1'"
        v-if="person.isNew"
        v-model="person.fullName"
        @change="handle"
      >
      <div v-else>{{ person.fullName }}</div>
      <div>{{ person.isChild ? 'Kid' : 'Caregiver' }}</div>
    </div>
    <div class="controls">
      <button class="save" v-if="person.isNew" @click="save">Save</button>
      <template v-else>
        <Switcher v-model="person.isActive" @input="handle" />
        <div class="price">${{ price }}</div>
      </template>
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
  methods: {
    handle () {
      this.$emit('changePerson', this.person)
    },
    save () {
      this.$validator.validateAll().then(checked => {
        if (checked) return this.$emit('savePerson', this.person, this.person.isChild)
        this.$emit('handleError', 'Enter full name!')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.booking-person {
  align-items: center;
  display: flex;
  margin-bottom: 20px;
}

.image {
  background: #ddd;
  border-radius: 100%;
  margin-right: 15px;
  height: 60px;
  min-height: 60px;
  min-width: 60px;
  object-fit: contain;
  width: 60px;
}

.name {
  flex: 1;
  line-height: 22px;
  padding-right: 20px;

  input {
    border: 0;
    border-bottom: 1px solid #D4D4D4;
    color: #4F4F4F;
    font: inherit;
    padding: 5px 0 5px 0;
    width: 100%;

    &::placeholder {
      color: #aaa;
    }
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

  .save {
    background: #E1519F;
    border: 0;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font: inherit;
    font-size: 15px;
    padding: 10px 15px 10px 15px;
  }
}
</style>