<template>
  <div class="account-person">
    <img class="icon" src="@/assets/images/user-black.svg">
    <div class="forms">
      <div>
        <label>Full Name</label>
        <input type="text" v-model="settings.fullName">
      </div>
      <div>
        <label>Email</label>
        <input type="text" v-model="settings.email">
      </div>
      <div>
        <label>Password</label>
        <input placeholder="**********" type="text" v-model="settings.password">
      </div>
      <div>
        <label>Phone</label>
        <input type="text" v-model="settings.phone">
      </div>
    </div>
    <div class="buttons">
      <button @click="$emit('saveUserSettings', settings)">Update</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    settings: { required: true, type: Object }
  }
}
</script>

<style lang="scss" scoped>
@include desktop {
  .account-person {
    align-items: center;
    display: flex;
    margin-bottom: 25px;

    .icon {
      height: 60px;
      margin-right: 50px;
      object-fit: contain;
      width: 60px;
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
    }
  }
}

@include mobile {
 .account-person {
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