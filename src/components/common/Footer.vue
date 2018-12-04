<template>
  <div class="footer">
    <div class="container">
      <div class="main">
        <div class="section">
          <div class="title">FOR PARENTS</div>
          <ul class="list">
            <li><a href="#">Browse Activities</a></li>
            <li><a href="#">Browse Providers</a></li>
            <li><a href="#">Sign Up</a> | <a href="#">Sign In</a></li>
            <li><a href="#">FAQ by Parents</a></li>
          </ul>
        </div>
        <div class="section">
          <div class="title">FOR ACTIVITY PROVIDERS</div>
          <ul class="list">
            <li><a href="#">Sign Up</a> | <a href="#">Sign In</a></li>
            <li><a href="#">Feature Your Activities</a></li>
            <li><a href="#">FAQ by Providers</a></li>
          </ul>
        </div>
        <div class="section">
          <div class="title">LETS GET SOCIAL</div>
          <ul class="list">
            <li><a href="#">Blog</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
          </ul>
        </div>
        <div class="section">
          <div class="title">GOBAMBINO</div>
          <ul class="list">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Meet the Team</a></li>
            <li><a href="#">#GoBambinoGives</a></li>
            <li><a href="#">Contact us</a></li>
          </ul>
        </div>
        <div class="section">
          <div class="title">LEGAL</div>
          <ul class="list">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Payment Terms</a></li>
          </ul>
        </div>
        <div class="section">
          <img src="@/assets/images/apple.svg">
          <img src="@/assets/images/google.svg">
        </div>
      </div>
      <div class="copyright">© 2017 GoBambino. All Rights Reserved.</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@include desktop {
  .footer {
    background: $gradient;
    height: 300px;
  }

  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .main {
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding-top: 60px;
  }

  .section {
    flex: 1;
  }

  .title {
    color: #fff;
    font-size: 13px;
    font-weight: 300;
    opacity: 0.6;
  }

  .list {
    color: #fff;
    font-size: 11px;
    list-style: none;
    padding: 0;

    a {
      color: #fff;
      text-decoration: none;
    }
  }

  .copyright {
    color: #FFFFFF;
    font-weight: 300;
    font-size: 10px;
    margin-bottom: 12px;
  }
}

@include mobile {
  .footer {
    display: none;
  }
}
</style>