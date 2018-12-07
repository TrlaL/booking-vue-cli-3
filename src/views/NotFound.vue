<template>
  <div class="container">
    <Navigation />
    <div class="box">
      <div class="code">Not Found</div>
      <div class="text">The requested resource could not be found</div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/common/Navigation'

export default {
  components: { Navigation }
}
</script>

<style lang="scss" scoped>
@include desktop {
  .box {
    padding: 50px 0 50px 0;
    text-align: center;
  }

  .code {
    font-size: 30px;
  }

  .text {
    font-size: 17px;
  }
}

@include mobile {
  .box {
    border-top: 1px solid #ddd;
    box-shadow: none;
    margin: 0;
    padding: 20px 0 20px 0;
    text-align: center;
  }

  .code {
    font-size: 23px;
  }
}
</style>