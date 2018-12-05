<template>
  <div class="family-person">
    <Modal class="modal" id="family-person">You entered incorrect data!</Modal>
    <img class="icon" :src="require(`@/assets/images/${icon}`)">
    <div class="forms">
      <div>
        <label>Full Name</label>
        <input
          name="fullName"
          placeholder="Enter full name"
          type="text"
          v-validate="'required|min:1|max:200'"
          v-model="data.fullName"
        >
      </div>
      <div v-if="isKid">
        <label>Date of Birth</label>
        <input
          name="birthDate"
          placeholder="YYYY-MM-DD"
          type="text"
          v-validate="'required|date_format:YYYY-MM-DD'"
          v-model="data.birthDate"
        >
      </div>
      <template v-if="isCaregiver">
        <div>
          <label>Email</label>
          <input
            name="email"
            placeholder="example@gmail.com"
            type="text"
            v-validate="'required|email'"
            v-model="data.email"
          >
        </div>
        <div>
          <label>Phone</label>
          <input
            name="phone"
            placeholder="111-222-3333"
            type="text"
            v-validate="'required|min:1|max:50'"
            v-model="data.phone"
          >
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
import Modal from '../common/Modal'

export default {
  components: { Modal },
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
      this.$validator.validateAll().then(checked => {
        if (checked) {
          this.$emit('savePerson', person, data)
        } else {
          this.$store.commit('SET_MODAL_VISIBLE', { id: 'family-person', visible: true })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@include desktop {
  .family-person {
    display: flex;
    margin-bottom: 25px;
  }

  .modal {
    text-align: center;
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
      color: #888;
      font-size: 14px;
    }

    input {
      border: 0;
      border-bottom: 1px solid #D4D4D4;
      color: #4F4F4F;
      font: inherit;
      padding: 7px 0 7px 0;
      width: 100%;

      &::placeholder {
        color: #aaa;
      }
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
}

@include mobile {
 .family-person {
    border-bottom: 1px solid #ddd;
    padding: 20px;

    &:last-child {
      border-bottom: 0;
    }

    .icon {
      display: none;
    }

    .forms {
      margin-bottom: 10px;

      div {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
      }

      label {
        color: #888;
        font-size: 14px;
      }

      input {
        border: 0;
        border-bottom: 1px solid #D4D4D4;
        color: #4F4F4F;
        font: inherit;
        padding: 7px 0 7px 0;
        width: 100%;

        &::placeholder {
          color: #aaa;
        }
      }
    }

    .buttons {
      display: flex;

      .desktop-remove {
        display: none;
      }

      .mobile-remove {
        background: #fff;
        color: #E1519F;
      }

      button {
        background: #E1519F;
        border: 2px solid #E1519F;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
        font: inherit;
        flex: 1;
        margin-right: 10px;
        padding: 8px 0 8px 0;
        width: 90px;

        &:last-child {
          margin: 0;
        }
      }
    }
  }
}
</style>