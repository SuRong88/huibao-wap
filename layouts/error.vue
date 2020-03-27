<template>
  <div class="error-page">
    <v-header :show="show"></v-header>
    <div class="expression">o(╥﹏╥)o</div>
    <div class="error_text">404</div>
    <div class="text">页面找不到了</div>
    <v-footer></v-footer>
  </div>
</template>

<script>
export default {
  components: {
    vHeader(resolve) {
      require(['@/components/vHeader'], resolve);
    },
    vFooter(resolve) {
      require(['@/components/vFooter'], resolve);
    }
  },
  data() {
    return {
      show: false
    };
  }
};
</script>

<style lang="less">
.error-page {
  color: #000;
  text-align: center;
  padding-top: 100px;
  .expression {
    font-size: 60px;
  }
  .error_text {
    font-size: 60px;
    margin: 50px auto;
  }
  .text {
    font-size: 40px;
  }
  .v-header {
    .nav-t {
      background: #ffffff;
      box-shadow: 0 1px 2px 0 rgba(222, 221, 221, 0.5);
    }
    .logo {
    //   background-image: url(../assets/images/nav/header_logo.png);
    }
    .icon-fold {
    //   background-image: url(../assets/images/nav/header_icon01.png);
    }
  }
  .v-footer {
    width: 100vw;
    position: fixed;
    left: 0;
    bottom: 0;
  }
}
</style>
