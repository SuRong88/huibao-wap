
export default {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        title: '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width,height=device-height,initial-scale=1.0,maximum-scale=1.0,user-scalable=no' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'format-detection', content: 'telephone=no' },
            { hid: 'description', name: 'description', content: '' },
            { hid: 'keywords', name: 'keywords', content: '' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
    /*
    ** Global CSS
    */
    css: [
        'mint-ui/lib/style.css',
        'swiper/dist/css/swiper.css',
        '~assets/css/layout.less',
        '~assets/css/common.less'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '~/plugins/mint-ui.js',
        "~/plugins/layout.js",
        "~/plugins/request.js",
        "~/plugins/errorCode.js",
        "~/plugins/format.js",
        {
            src: "~/plugins/vue-awesome-swiper.js",
            ssr: false
        }
    ],
    /*
    ** router配置
    *
    */
    router:{
        base: '/wap/'
    },
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/axios'
    ],
    axios: {
        proxy: true
        // prefix: '/api/',
    },
    // 代理的配置项
    proxy: {
        '/api': {
            target: 'http://www.techviewinfo.com/api',
            pathRewrite: {
            '^/api': '/'
            }
        }
    },
    /*
    ** Build configuration
    */
    build: {
        transpile: [],
        /*
        ** You can extend webpack config here
        */
        extend (config, ctx) {
        }
    } 
}
