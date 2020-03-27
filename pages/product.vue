<template>
  <div class="product-page">
    <v-header></v-header>
    <main class="product-main page-wrapper">
      <!-- poster一些手机浏览器不支持，而且video高度可能会“压扁” -->
      <video poster="http://www.techviewinfo.com/_nuxt/img/708ded0.jpg" id="video" class="video-box" controls>
         <source src="@/assets/images/wap/product/video.mp4">
        不支持播放该视频
      </video>
      <!-- <div id="output" style="width: 100%; height: 500px;"></div> -->
      <div class="product-box">
        <div class="product-banner">
          <img class="product-banner-img" src="@/assets/images/wap/product/banner1.jpg" alt="" />
          <div class="intro-box">
            <img class="intro-tag" src="@/assets/images/culture/tag.png" alt="" />
            <p class="intro-tit">双重抗初老能量 逆转时光焕现美</p>
          </div>
          <img class="banner-tag" src="@/assets/images/others/MyAloneGarden.png" alt="" />
        </div>
        <p class="product-txt">
          利用先进的工艺提取技术，让芦荟的美容护理功效以更温和、更有效的形式完美呈现，舒缓保湿，有效缓解换季、压力、孕期等肌肤不适状况，打败疲惫和脆弱状态，日复一日，肌肤焕发健康光采！
        </p>
        <div class="mul-box">
          <ul class="product-list flex flex-wrap">
            <li class="product-item">
              <img class="item-img" src="@/assets/images/others/a.jpg" alt="" />
              <p class="item-txt">荟宝芦荟多肽提拉洁面乳</p>
            </li>
            <li class="product-item">
              <img class="item-img" src="@/assets/images/others/b.jpg" alt="" />
              <p class="item-txt">荟宝芦荟多肽提拉眼部精华液</p>
            </li>
            <li class="product-item">
              <img class="item-img" src="@/assets/images/others/c.jpg" alt="" />
              <p class="item-txt">荟宝芦荟多肽提拉洁面乳</p>
            </li>
            <li class="product-item">
              <img class="item-img" src="@/assets/images/others/d.jpg" alt="" />
              <p class="item-txt">荟宝芦荟多肽提拉洁面乳</p>
            </li>
          </ul>
          <div class="view-more">
            <div id="wrap" style="width: 60px;height: 60px;">
              <svg viewBox="0 0 100 100">
                <path d="M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0" fill="none" stroke="rgba(210,210,210,1)" stroke-width="2">></path>
                <path
                  d="M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0"
                  fill="none"
                  stroke="#2C5432"
                  stroke-linecap="round"
                  class="my-svg-path"
                  transform="rotate(180,50,50)"
                  stroke-width="4"
                ></path>
              </svg>
              <p class="txt">查看更多</p>
            </div>
          </div>
        </div>
      </div>
      <div class="product-box product-box2">
        <div class="product-banner">
          <img class="product-banner-img" src="@/assets/images/wap/product/banner2.jpg" alt="" />
          <div class="intro-box">
            <img class="intro-tag" src="@/assets/images/culture/tag.png" alt="" />
            <p class="intro-tit">双重抗初老能量 逆转时光焕现美</p>
          </div>
          <img class="banner-tag" src="@/assets/images/others/MyAloneGarden.png" alt="" />
        </div>
        <p class="product-txt">
          特别添加200:1的活性芦荟荟宝素，实现1瓶=3株新鲜芦荟，先进的科学提取工艺，充分保留了天然芦荟原有的活性成分，高效补水保湿，让营养更易吸收，好吸收比新鲜芦荟更有效！
        </p>
        <div class="mul-box">
          <ul class="product-list flex flex-wrap">
            <li class="product-item">
              <img class="item-img" src="@/assets/images/others/e.jpg" alt="" />
              <p class="item-txt">荟宝芦荟多肽提拉洁面乳</p>
            </li>
            <li class="product-item">
              <img class="item-img" src="@/assets/images/others/f.jpg" alt="" />
              <p class="item-txt">荟宝芦荟多肽提拉眼部精华液</p>
            </li>
            <li class="product-item">
              <img class="item-img" src="@/assets/images/others/g.jpg" alt="" />
              <p class="item-txt">荟宝芦荟多肽提拉洁面乳</p>
            </li>
            <li class="product-item">
              <img class="item-img" src="@/assets/images/others/h.jpg" alt="" />
              <p class="item-txt">荟宝芦荟多肽提拉洁面乳</p>
            </li>
          </ul>
          <div class="view-more">
            <div id="wrap" style="width: 60px;height: 60px;">
              <svg viewBox="0 0 100 100">
                <path d="M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0" fill="none" stroke="rgba(210,210,210,1)" stroke-width="2">></path>
                <path
                  d="M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0"
                  fill="none"
                  stroke="#2C5432"
                  stroke-linecap="round"
                  class="my-svg-path"
                  transform="rotate(180,50,50)"
                  stroke-width="4"
                ></path>
              </svg>
              <p class="txt">查看更多</p>
            </div>
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
  mounted() {
    // (function() {
    //   var video, output;
    //   var scale = 0.8;
    //   var initialize = function() {
    //     output = document.getElementById('output');
    //     video = document.getElementById('video');
    //     video.addEventListener('loadeddata', captureImage);
    //   };
    //   var captureImage = function() {
    //     var canvas = document.createElement('canvas');
    //     canvas.width = video.videoWidth * scale;
    //     canvas.height = video.videoHeight * scale;
    //     canvas.getContext('2d').drawImage(video, 5, 10, canvas.width, canvas.height);

    //     var img = document.createElement('img');
    //     img.src = canvas.toDataURL('image/png');
    //     img.style.width = '100%';
    //     img.style.height = '100%';
    //     output.appendChild(img);
    //   };
    //   initialize();
    // })();
  },
  data() {
    return {
      SEOInfo: {}
    };
  },
  computed: {}
};
</script>

<style lang="less"></style>
