<!-- 二期 -->
<template>
  <div class="hot-page">
    <v-header></v-header>
    <main class="hot-main">
      <div v-if="list.length > 0">
        <div class="hot-list flex flex-wrap">
          <div v-for="(item, index) in list" class="hot-item">
            <div class="item-hd"><img class="item-img" :src="item.cover_img" alt="" /></div>
            <div class="item-bd">
              <div class="item-tit">{{ item.title }}</div>
              <div class="item-desc">{{ item.desc }}</div>
              <a :href="item.buy_url" class="item-btn flex flex-center">立即购买</a>
            </div>
          </div>
        </div>
        <div class="" style="padding: 0 1.3rem;">
          <button v-show="!isLastPage && total_page != 0" @click="viewMore" class="view-more">查看更多</button>
          <p v-show="isLastPage && total_page != 0" class="nomore-tip">加载完毕</p>
        </div>
      </div>
    </main>
    <v-footer></v-footer>
  </div>
</template>

<script>
import URL from '@/plugins/url.js';
export default {
  components: {
    vHeader: resolve => require(['@/components/vHeader'], resolve),
    vFooter: resolve => require(['@/components/vFooter'], resolve)
  },
  // watchQuery: true,
  // validate({ query, route }) {
  //   // 必须是number类型
  //   return /^\d+$/.test(query.page);
  // },
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
    let [res01, res02] = await Promise.all([
      app.$axios.get(URL.getHotList, {
        params: {
          page: 1,
          rownum: 8
        }
      }),
      app.$axios.get(URL.getSEOInfo, {
        params: {
          type: 'custom',
          client: 2,
          module_id: 'product'
        }
      })
    ]);
    let pagination = res01.data.pagination;
    console.log(res01);
    return {
      list: res01.data.list,
      limit: pagination.rownum,
      current_page: pagination.current,
      total_page: pagination.total_page,
      total: pagination.total,
      isLastPage: pagination.current == pagination.total_page,
      SEOInfo: res02.data
    };
  },
  created() {
    // if (!this.$route.query.page) {
    //   this.$router.push({
    //     query: {
    //       page: 1
    //     }
    //   });
    // }
  },
  data() {
    return {
      SEOInfo: {},
      list: [],
      limit: 8,
      current_page: 1,
      total_page: 0,
      total: 0,
      isLastPage: false
    };
  },
  computed: {},
  methods: {
    // 查看更多
    viewMore() {
      let that = this;
      let page = this.current_page;
      page += 1;
      this.$axios
        .get(URL.getHotList, {
          params: {
            page: page,
            rownum: 8
          }
        })
        .then(res => {
          // let page = parseInt(this.current_page) + 1;
          // this.$router.push({
          //   query: {
          //     page: page
          //   }
          // });
          let data = res.data;
          let pagination = data.pagination;
          that.list = that.list.concat(data.list);
          that.current_page = pagination.current;
          that.total_page = pagination.total_page;
          that.total = pagination.total;
          that.isLastPage = pagination.current == pagination.total_page;
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="less"></style>
<!-- 一期 -->
<!-- <template>
   <div class="product-page">
     <v-header></v-header>
     <main class="product-main page-wrapper">
       <div v-for="(item, index) in list">
         <video
           v-if="item.product_video"
           autoplay
           :poster="item.cover_img"
           id="video"
           class="video-box"
           controls
           webkit-playsinline
           playsinline
           x5-playsinline
           x-webkit-airplay="allow"
         >
           <source :src="item.product_video" />
           不支持播放该视频
         </video>
         <div class="product-box">
           <div class="product-banner">
             <img class="product-banner-img" :src="item.bg_img" />
             <div class="intro-box">
               <img class="intro-tag" :src="item.tag_img" alt="" />
               <p class="intro-tit">{{ item.propaganda }}</p>
             </div>
             <img class="banner-tag" src="@/assets/images/others/MyAloneGarden.png" alt="" />
           </div>
           <p class="product-txt">{{ item.profiles }}</p>
           <div class="mul-box">
             <ul class="product-list flex flex-wrap">
               <li v-for="(subItem, subIndex) in item.product_data" class="product-item">
                 <img class="item-img" :src="subItem.product_img" alt="" />
                 <p class="item-txt">{{ subItem.product_title }}</p>
               </li>
             </ul>
             <a :href="item.link_url" target="_blank" class="view-more">
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
             </a>
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
     let [res01, res02] = await Promise.all([
       app.$axios.get(URL.getIntroduceList, {
         params: {
           type: 1,
           client: 2
         }
       }),
       app.$axios.get(URL.getSEOInfo, {
         params: {
           type: 'custom',
           client: 2,
           module_id: 'product'
         }
       })
     ]);
     return {
       list: res01.data,
       SEOInfo: res02.data
     };
   },
   created() {},
   data() {
     return {
       SEOInfo: {},
       list: []
     };
   },
   computed: {}
 };
 </script>

 <style lang="less"></style>
  -->
