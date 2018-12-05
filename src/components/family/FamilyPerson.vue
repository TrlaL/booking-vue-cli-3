<template>
  <div class="family-person">
    <img class="icon" :src="require(`@/assets/images/${icon}`)">
    <div class="forms">
      <div>
        <label>Full Name</label>
        <input type="text" v-model="data.fullName">
      </div>
      <div v-if="isKid">
        <label>Date of Birth</label>
        <input type="text" v-model="data.birthDate">
      </div>
      <template v-if="isCaregiver">
        <div>
          <label>Email</label>
          <input type="text" v-model="data.email">
        </div>
        <div>
          <label>Phone</label>
          <input type="text" v-model="data.phone">
        </div>
      </template>
    </div>
    <div class="buttons">
      <button @click="savePerson(person, data)">{{ data.isNew ? 'Save' : 'Update' }}</button>
      <template v-if="!data.isNew">
        <button class="mobile-remove" @click="deletePerson(data.id)">Remove</button>
        <img class="desktop-remove" src="@/assets/images/reset.svg" @click="deletePerson(data.id)">
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: { required: true, type: Object },
    person: { required: true, type: String }
  },
  computed: {
    icon () {
      return this.isKid ? 'kid.svg' : 'user-black.svg'
    },
    isCaregiver () {
      return this.person === 'caregiver'
    },
    isKid () {
      return this.person === 'kid'
    }
  },
  methods: {
    deletePerson (id) {
      this.$emit('deletePerson', id)
    },
    savePerson (person, data) {
      this.$emit('savePerson', person, data)
    }
  }
}
</script>

<style lang="scss" scoped>
.family-person {
  display: flex;
  margin-bottom: 25px;
}

.icon {
  margin-right: 50px;
  object-fit: contain;
}

.forms {
  display: flex;
  flex: 1;

  div {
    display: flex;
    flex-direction: column;
    margin-right: 15px;

    &:last-child {
      margin: 0;
    }
  }

  label {
    color: #A1A1A1;
    font-size: 14px;
  }

  input {
    border: 0;
    border-bottom: 1px solid #D4D4D4;
    color: #4F4F4F;
    font: inherit;
    padding: 7px 0 7px 0;
    width: 100%;
  }
}

.buttons {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-left: 50px;
  width: 120px;

  .mobile-remove {
    display: none;
  }

  button {
    background: #E1519F;
    border: 0;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font: inherit;
    flex-shrink: 0;
    padding: 8px 0 8px 0;
    width: 90px;
  }

  img {
    cursor: pointer;
  }
}
</style>