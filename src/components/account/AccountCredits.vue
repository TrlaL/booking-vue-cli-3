<template>
  <div class="account-credits">
    <img class="icon" src="@/assets/images/credits.svg">
    <div class="credits">
      <div v-if="!settings.money">Currently, no credits available</div>
      <div v-else>You have <b>{{ settings.money }}</b> credits</div>
    </div>
    <div class="buttons">
      <button @click="$emit('addCredit')">+ Add</button>
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
  .account-credits {
    align-items: center;
    display: flex;
    margin-bottom: 25px;
  }

  .icon {
    height: 60px;
    margin-right: 50px;
    object-fit: contain;
    width: 60px;
  }

  .credits {
    display: flex;
    flex: 1;
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

@include mobile {
 .account-credits {
    border-bottom: 1px solid #ddd;
    padding: 20px;
  }

  .icon {
    display: none;
  }

  .credits {
    margin-bottom: 10px;
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
      padding: 8px 0 8px 0;
      width: 90px;
    }
  }
}
</style>