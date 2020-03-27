<template>
  <div class="news-detail-page">
    <v-header></v-header>
    <main class="detail-main">
      <div class="main-banner"></div>
      <div class="page-wrapper">
        <div class="hd">
          <h2 class="tit">大事件|追梦20年，荟宝·我家的芦荟妆园20 周年盛典璀璨绽放</h2>
          <p class="brief">
            <span class="type">品牌资讯</span>
            <span class="line">|</span>
            <span class="date">2019.03.05</span>
          </p>
        </div>
        <div class="bd edit_textBox">
          芦荟护肤的概念早已深入人心，市场上的芦荟品牌也是琳琅满目，而在芦荟领域深耕二十年的荟宝至今仍创新不断，继推出3X芦荟系列后，又构建了单品牌店商业新体系。
          荟宝为什么能持续为芦荟赋能？ 聚焦芦荟时代，汇集星光力量。
          成立于1999年的荟宝品牌，自诞生之初就推出了荟宝化妆品日本木立芦荟系列，芦荟美肤的概念由此在国内市场广为传播。一路走来，荟宝已在芦荟领域深耕二十年。
          自创立之初，荟宝就坚持“专心专意做芦荟”，致力于打造芦荟家庭护理品牌NO.1，一直以来不断研发优质商品，为每个家庭带来美丽与健康，从而获得了“芦荟之宝”的美称。
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
  watchQuery: true,
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
  async asyncData({ store, params, query, route, app }) {
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
      SEOInfo: SEOInfo
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
