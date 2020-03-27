<template>
  <div class="contact-page">
    <v-header></v-header>
    <main class="contact-main">
      <div class="main-banner common-banner">
        <div class="banner-title-box">
          <h2 class="tit-cn">联系我们</h2>
          <h2 class="tit-en">Contact us</h2>
        </div>
      </div>
      <div class="page-wrapper">
        <div class="contact-enter">
          <h3 class="enter-tit">
加盟“我家的荟宝妆园”
          </h3>
          <div class="enter-list">
            <input class="enter-item" placeholder="姓氏" type="text">
            <input class="enter-item" placeholder="名字" type="text">
            <input class="enter-item" placeholder="电子邮箱" type="text">
            <input class="enter-item" placeholder="网址" type="text">
            <textarea class="enter-item enter-item-mul" placeholder="留言" type="text">
            </textarea>
            <button class="btn-submit">
              联系我们
            </button>
          </div>
          <div class="contact-info">
            <a class="info-logo" href="">
              <img class="logo" src="@/assets/images/side/logo.png" alt="" />
            </a>
            <p class="tel-txt">
              总部加盟咨询服务热线：
            </p>
            <p class="tel">
              400-700-2742
            </p>
          </div>
        </div>
      </div>
    </main>
    <v-footer></v-footer>
  </div>
</template>

<script>
import URL from '@/plugins/url.js';
export default {
  // default模板
  // layout: function(context) {
  //   return 'default-demo';
  // },
  // 参数校验（失败直接跳转至404页面）
  // validate({ params, route }) {
  //   // 必须是number类型
  //   return /^\d+$/.test(params.id);
  // },
  watchQuery:true,
  components: {
   vHeader: resolve => require(['@/components/vHeader'], resolve),
   vFooter: resolve => require(['@/components/vFooter'], resolve)
  },
  head() {
    return {
      title: this.SEOInfo.seo_title,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.SEOInfo.seo_keyword
        },
        {
          hid: 'description',
          name: 'description',
          content: this.SEOInfo.seo_desc
        }
      ]
    };
  },
  async asyncData({ store, params,query, route, app }) {
    let SEOInfo = null;
    await app.$axios
      .get(URL.getSEOInfo, {
        params: {
          name: '/'
        }
      })
      .then(res => {
        SEOInfo = res.data;
        console.log('async请求成功');
      })
      .catch(err => {
        console.log(err);
        console.log('async请求失败');
      });
    return {
      SEOInfo: SEOInfo,
    };
  },
  created() {},
  data() {
    return {
      SEOInfo: {}
    };
  }
};
</script>

<style lang="less"></style>
