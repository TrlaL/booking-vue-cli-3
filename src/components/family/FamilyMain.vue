<template>
  <div class="box container">
    <div class="section">
      <div class="title">
        <img class="title-icon" src="@/assets/images/kid.svg">
        Kid(s)
      </div>
      <div class="persons" v-if="isLoaded">
        <div class="person" v-for="(kid, i) in kids" :key="i">
          <img class="icon" src="@/assets/images/kid.svg">
          <div class="forms">
            <div>
              <label>Full Name</label>
              <input type="text" v-model="kid.fullName">
            </div>
            <div>
              <label>Date of Birth</label>
              <input type="text" v-model="kid.birthDate">
            </div>
          </div>
          <div class="buttons">
            <button @click="savePeson('kid', kid)">{{ kid.isNew ? 'Save' : 'Update' }}</button>
            <template v-if="!kid.isNew">
              <button class="mobile-remove" @click="deletePerson(kid.id)">Remove</button>
              <img class="desktop-remove" src="@/assets/images/reset.svg" @click="deletePerson(kid.id)">
            </template>
          </div>
        </div>
      </div>
      <Loading v-else />
      <div class="empty" v-show="isLoaded && !kids.length">You have not added children yet.</div>
      <div class="add" v-show="isLoaded">
        <a @click="addPerson('kid')">+ Add Kid</a>
      </div>
    </div>
    <div class="section">
      <div class="title">
        <img class="title-icon" src="@/assets/images/user-black.svg">
        Caregiver(s)
      </div>
      <div class="persons" v-if="isLoaded">
        <div class="person" v-for="(caregiver, i) in caregivers" :key="i">
          <img class="icon" src="@/assets/images/user-black.svg">
          <div class="forms">
            <div>
              <label>Full Name</label>
              <input type="text" v-model="caregiver.fullName">
            </div>
            <div>
              <label>Email</label>
              <input type="text" v-model="caregiver.email">
            </div>
            <div>
              <label>Phone</label>
              <input type="text" v-model="caregiver.phone">
            </div>
          </div>
          <div class="buttons">
            <button @click="savePeson('caregiver', caregiver)">{{ caregiver.isNew ? 'Save' : 'Update' }}</button>
            <template v-if="!caregiver.isNew">
              <button class="mobile-remove" @click="deletePerson(caregiver.id)">Remove</button>
              <img class="desktop-remove" src="@/assets/images/reset.svg" @click="deletePerson(caregiver.id)">
            </template>
          </div>
        </div>
      </div>
      <Loading v-else />
      <div class="empty" v-show="isLoaded && !caregivers.length">You have not added caregivers yet.</div>
      <div class="add" v-show="isLoaded">
        <a @click="addPerson('caregiver')">+ Add Caregiver</a>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/common/Loading'

export default {
  components: {
    Loading
  },
  props: {
    isLoaded: {
      required: true,
      type: Boolean
    },
    members: {
      required: true,
      type: Array
    }
  },
  computed: {
    caregivers () {
      return this.members.filter(member => !member.isChild)
    },
    kids () {
      return this.members.filter(member => member.isChild)
    }
  },
  methods: {
    addPerson (person) {
      this.$emit('addPerson', person)
    },
    deletePerson (id) {
      this.$emit('deletePerson', id)
    },
    savePeson (person, data) {
      this.$emit('savePerson', person, data)
    }
  }
}
</script>

<style lang="scss" scoped>
@include desktop {
  .container {
    padding: 25px 0 25px 0;
  }

  .section {
    margin: auto;
    margin-bottom: 25px;
    max-width: 70%;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .title {
    color: #E1519F;
    font-size: 15px;
    margin-bottom: 15px;

    &::after {
      content: ':';
    }

    .title-icon {
      display: none;
    }
  }

  .person {
    display: flex;
    margin-bottom: 25px;

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
  }

  .add {
    display: flex;
    justify-content: flex-end;

    a {
      cursor: pointer;
      color: #D9429F;
      display: block;
      font-size: 14px;
      width: 120px;
    }
  }
}

@include mobile {
  .box {
    box-shadow: none;
  }

  .container {
    background: #fff;
    margin: 0;
  }

  .empty {
    margin: 20px;
  }

  .section {
    background: #fff;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .title {
    align-items: center;
    background: #eee;
    border-top: 1px solid #ddd;
    color: #E1519F;
    display: flex;
    font-size: 18px;
    padding: 10px 20px 10px 20px;

    .title-icon {
      display: block;
      height: 30px;
      margin-right: 5px;
      object-fit: contain;
      width: 30px;
    }
  }

  .person {
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

  .add {
    border-top: 1px solid #ddd;
    background: #eee;
    color: #E1519F;
    cursor: pointer;
    text-align: center;
    width: 100%;

    a {
      display: block;
      padding: 10px;
    }
  }
}
</style>