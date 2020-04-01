export default function(app) {
    let axios = app.$axios;
    // 基本配置
    axios.defaults.timeout = 10000
    axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    axios.interceptors.request.use(req => {
        return req
    }, err => {
        return Promise.reject(err);
    })
    axios.interceptors.response.use(res => {
        if (res.data.code != 0) {
            return Promise.reject(res);
        }
        return res.data
    }, err => {
        return Promise.reject(err);
    })
}
