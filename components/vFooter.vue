<template>
  <div class="v-footer">
    <div class="copyright">
      {{ webInfo.website_copyright }}
      <a href="http://www.beian.miit.gov.cn" target="_blank">{{ webInfo.website_icp_numb }}</a>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  computed: {
    webInfo() {
      return this.$store.state.webInfo;
    }
  },
  created() {
    let that = this;
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less" scoped>
  .v-footer{
    .copyright{
      text-align: center;
      padding: 1rem 2.7rem 2rem;
      font-size:12px;
      font-family:PingFang SC;
      color:rgba(153,153,153,1);
      line-height:20px;
      border-top: 1px solid rgba(191,191,191,1);
      a{
        font-size:inherit;
        color:inherit;
      }
    }
  }
</style>
