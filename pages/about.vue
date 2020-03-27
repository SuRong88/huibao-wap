<template>
  <div class="about-page">
    <v-header></v-header>
    <div class="about-swiper-container" v-swiper:mySwiper1="swiperOption">
      <div class="swiper-wrapper">
        <!-- 第一屏 -->
        <div class="swiper-slide swiper-item">
          <div class="main-banner common-banner">
            <div class="banner-title-box">
              <h2 class="tit-cn">荟宝文化</h2>
              <h2 class="tit-en">About us</h2>
            </div>
          </div>
          <div class="item-con">
            <h2 class="item-tit">云南元江20000亩高山芦荟种植基地</h2>
            <p class="item-txt text-j">
              云南元江，中国芦荟之乡，野生芦荟发源地，是亚洲较大的库拉索芦荟种植基地。这里得天独厚的热带自然气候，充足的阳光和地理环境条件，在红河谷和高山包围下孕育了2万亩肥沃健硕的芦荟，芦荟多糖含量超高，活性更强，对老化肌肤的修护能力更有效。工厂采用超高水准的设备、工艺流程及先进工艺和严格的生产管理，从根本上保证了芦荟原料的一流质量。
            </p>
            <div class="view-more">
              <p class="line"></p>
              <p class="txt">向下滑动</p>
            </div>
          </div>
        </div>
        <!-- 第二屏 -->
        <div class="swiper-slide swiper-item">
          <div class="item-con item-con2">
            <h2 class="item-tit">海南5000亩芦荟种植基地</h2>
            <p class="item-txt text-j">
              库拉索岛是世界上好芦荟的原产地，而中国著名的库拉索芦荟产地在海南，这里得天独厚，与库拉索岛同一纬度，常年气温在 26-28° C,
              温暖干燥和阳光充足造就了优质芦荟的生长。荟宝在海南的 5000 亩芦荟种植基地，采用与美国 Aloecorp 相同的农场管理 SOP，坚持以 4Q
              黄金标准供应芦荟原料,确保芦荟生长和采集达到较优品质。
            </p>
            <div class="view-more">
              <p class="line"></p>
              <p class="txt">向下滑动</p>
            </div>
          </div>
        </div>
        <!-- 第三屏 -->
        <div
          class="swiper-slide swiper-item swiper-item03
         flex flex-col"
        >
          <div class="show-list-box flex flex-col">
            <ul class="show-list flex flex-1 flex-col flex-jcsb">
              <li class="show-item flex flex-jcsb">
                <div class="item-l"><img class="item-img" src="@/assets/images/culture/Quality-Breed.jpg" alt="" /></div>
                <div class="line-dot"></div>
                <div class="item-r mul">
                  <img class="mul-icon" src="@/assets/images/culture/Quality-Breed.png" alt="" />
                  <p class="mul-tit">黄金芦荟品质</p>
                  <p class="mul-line"></p>
                  <p class="mul-txt">正宗美国原产库拉索芦荟</p>
                </div>
              </li>
              <li class="show-item flex flex-jcsb">
                <div class="item-l mul">
                  <img class="mul-icon" src="@/assets/images/culture/Quality-Plant.png" alt="" />
                  <p class="mul-tit">黄金农场种植</p>
                  <p class="mul-line"></p>
                  <p class="mul-txt">先天地理条件，露天农场种植</p>
                </div>
                <div class="line-dot"></div>
                <div class="item-r"><img class="item-img" src="@/assets/images/culture/Quality-Plant.jpg" alt="" /></div>
              </li>
              <li class="show-item flex flex-jcsb">
                <div class="item-l"><img class="item-img" src="@/assets/images/culture/Quality-Picking.jpg" alt="" /></div>
                <div class="line-dot"></div>
                <div class="item-r mul">
                  <img class="mul-icon" src="@/assets/images/culture/Quality-Picking.png" alt="" />
                  <p class="mul-tit">黄金时期收割</p>
                  <p class="mul-line"></p>
                  <p class="mul-txt">只收割处三年黄金生长期芦荟</p>
                </div>
              </li>
              <li class="show-item flex flex-jcsb">
                <div class="item-l mul">
                  <img class="mul-icon" src="@/assets/images/culture/Quality-Extrac.png" alt="" />
                  <p class="mul-tit">黄金原汁萃取</p>
                  <p class="mul-line"></p>
                  <p class="mul-txt">99%只采用新鲜芦荟萃取</p>
                </div>
                <div class="line-dot"></div>
                <div class="item-r"><img class="item-img" src="@/assets/images/culture/Quality-Extrac.jpg" alt="" /></div>
              </li>
              <div class="line-box">
                <!-- <div class="dot-box">
                 <div class="line-dot"></div>
                 <div class="line-dot"></div>
                 <div class="line-dot"></div>
                 <div class="line-dot"></div>
               </div> -->
              </div>
            </ul>
          </div>
          <v-footer></v-footer>
        </div>
      </div>
    </div>
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
      SEOInfo: {},
      swiperOption: {
        loop: false,
        speed: 800,
        direction: 'vertical',
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 0,
        pagination: {
          el: '.swiper-pagination'
          // dynamicBullets: true
        },
        on: {
          slideChange() {
            // console.log('onSlideChangeEnd', this);
          },
          tap() {
            // console.log('onTap', this);
          }
        }
      }
    };
  }
};
</script>

<style lang="less"></style>
