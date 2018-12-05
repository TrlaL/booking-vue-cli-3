<template>
  <div class="box container">
    <div class="section">
      <div class="title">
        <img class="title-icon" src="@/assets/images/kid.svg">
        Kid(s)
      </div>
      <div class="persons" v-if="isLoaded">
        <FamilyPerson
          person="kid"
          v-for="(kid, i) in kids"
          :data="kid"
          :key="i"
          @deletePerson="deletePerson"
          @savePerson="savePerson"
        />
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
        <FamilyPerson
          person="caregiver"
          v-for="(caregiver, i) in caregivers"
          :data="caregiver"
          :key="i"
          @deletePerson="deletePerson"
          @savePerson="savePerson"
        />
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
import FamilyPerson from './FamilyPerson'
import Loading from '@/components/common/Loading'

export default {
  components: { FamilyPerson, Loading },
  props: {
    isLoaded: { required: true, type: Boolean },
    members: { required: true, type: Array }
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
    savePerson (person, data) {
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