<template>
    <div class="content my">
        <div class="index_theme">
            <div class="my_info_box">
                <div class="my_info">
                    <div class="my_head">
                        <!--默认头像-->
                        <img v-if="!userInfo.avatar || userInfo.avatar=='undefined'" src="../../assets/images/head_default.png">
                        <img v-else="userInfo.avatar" :src="userInfo.avatar">
                    </div>
                    <div class="my_num">
                        <p>{{encryptPhone(userInfo.phone)}}</p>
                        <span>V{{userInfo.level}}
                            <font v-if="userInfo.level == '1'">注册会员></font>
                            <font v-else-if="userInfo.level == '2'">白银会员></font>
                            <font v-else-if="userInfo.level == '3'">黄金会员></font>
                            <font v-else-if="userInfo.level == '4'">黑金会员></font>
                            <font v-else-if="userInfo.level == '5'">砖石会员></font>
                            <font v-else>皇冠会员></font>
                        </span>
<!--                        V1注册会员：成长值（0~700）
                        V2白银会员：成长值（700~1500）
                        V3黄金会员：成长值（1500~3000）
                        V4黑金会员：成长值（3000~4000）
                        V5砖石会员：成长值（4000~5000）
                        V6皇冠会员：成长值（>=5000）-->
                    </div>
                </div>
                <router-link to="/myInfo"><img src="../../assets/images/my_setting.png"></router-link>
            </div>
            <div class="my_link_table">
                <router-link to="/order">
                    <!--<img src="../../assets/images/my_link_icon1.png">-->
                    <img src="../../assets/images/my_link_order.png">
                    <span>我的订单</span>
                </router-link>
                <router-link to="/myRights">
                    <!--<img src="../../assets/images/my_link_icon2.png">-->
                    <img src="../../assets/images/my_link_rights.png">
                    <span>会员权益</span>
                </router-link>
                <router-link to="/points">
                    <!--<img src="../../assets/images/my_link_icon3.png">-->
                    <img src="../../assets/images/my_link_points.png">
                    <span>成长值</span>
                </router-link>
                <router-link to="/coupon">
                    <!--<img src="../../assets/images/my_link_icon4.png">-->
                    <img src="../../assets/images/my_link_coupon.png">
                    <span>优惠券</span>
                </router-link>
            </div>
        </div>
        <div class="my_link_list">
            <router-link to="/myRights">
                <!--<img class="title" src="../../assets/images/my_link_title1.png">-->
                <b>会员权益</b>
                <!--<img class="arrow_right" src="../../assets/images/icon_arrow_right.png">-->
                <span class="arrow">
                    <i class="fa fa-angle-right"></i>
                </span>
            </router-link>
            <router-link to="/myAddress">
                <!--<img class="title" src="../../assets/images/my_link_title2.png">-->
                <b>服务地址</b>
                <span class="arrow">
                    <i class="fa fa-angle-right"></i>
                </span>
            </router-link>
            <a @click="initService">
                <!--<img class="title" src="../../assets/images/my_link_title3.png">-->
                <b>联系客服</b>
                <span class="arrow">
                    <i class="fa fa-angle-right"></i>
                </span>
            </a>
            <router-link  to="/feedback">
                <!--<img class="title" src="../../assets/images/my_link_title4.png">-->
                <b>意见反馈</b>
                <span class="arrow">
                    <i class="fa fa-angle-right"></i>
                </span>
            </router-link>
<!--            <router-link to="/invite">
                <img class="title" src="../../assets/images/my_link_title5.png">
                <span class="arrow">
                    <i class="fa fa-angle-right"></i>
                </span>
            </router-link >-->

<!--            <a>
                <img class="title" src="../../assets/images/my_link_title6.png">
                <span class="arrow">
                    <i class="fa fa-angle-right"></i>
                </span>
            </a>
            <a>
                <img class="title" src="../../assets/images/my_link_title7.png">
                <span class="arrow">
                    <i class="fa fa-angle-right"></i>
                </span>
            </a>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "My",
        data(){
            return{
                person: ''
            }
        },
        computed: {
            userInfo(){
                return this.$store.getters.user
            }
        },
        methods: {
            encryptPhone(phone){
                if(!phone) return;
                //手机号隐藏中间4位
                return phone.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2");
            },
            onlineService(){//在线客服
                (function(m, ei, q, i, a, j, s) {
                    m[i] = m[i] || function() {
                        (m[i].a = m[i].a || []).push(arguments)
                    };
                    j = ei.createElement(q),
                        s = ei.getElementsByTagName(q)[0];
                    j.async = true;
                    j.charset = 'UTF-8';
                    j.src = '//static.meiqia.com/dist/meiqia.js';
                    s.parentNode.insertBefore(j, s);
                })(window, document, 'script', '_MEIQIA');
                _MEIQIA('entId', 50538);

                // 在这里开启手动模式（必须紧跟美洽的嵌入代码）
                _MEIQIA('manualInit');

                // 在这里开启无按钮模式（常规情况下，需要紧跟在美洽嵌入代码之后）
                _MEIQIA('withoutBtn');

                // 初始化成功时的回调
                _MEIQIA('allSet', this.showServicePanel);
            },
            initService(){
                // 调用手动初始化MEIQIA
                _MEIQIA('init');
            },
            showServicePanel(){
                //在美洽插件加载完毕后立即调用聊天窗，组合「初始化成功时的回调」接口来实现
                _MEIQIA('showPanel');
            }
        },
        created(){
            //防止页面刷新,vuex:store失效
            //在页面加载时读取localStorage里的状态信息
            if (localStorage.getItem("store") ) {
                this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))));
            }

            console.log(this.userInfo);
        },
        mounted () {
            document.querySelector('body').setAttribute('style', 'background:#fff;');
            this.onlineService();
        },
        beforeDestroy () {
            document.querySelector('body').removeAttribute('style')
        }
    }
</script>

<style scoped>
    .my{
        background: #fff;
    }
    .index_theme{
        width: 7.5rem;
        height: auto;
        background: #fff url(../../assets/images/index_bg.png) no-repeat top center;
        background-size: 7.5rem 4.42rem;
        margin-bottom: 0;
    }
    .my_info_box{
        width: 6.9rem;
        height: 1.1rem;
        margin: 0 auto;
        padding: 0.75rem 0;
        display: flex;
        justify-content: space-between;
    }
    .my_info_box a{
        width: 0.38rem;
    }
    .my_info_box a img{
        width:100%;
    }
    .my_info{
        flex:1;
        display: flex;
    }
    .my_head{
        width:1.1rem;
        height: 1.1rem;
        box-sizing: border-box;
        border: 0.03rem solid #fff;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 0.25rem;
    }
    .my_head img{
        width:100%;
        height: 100%;
        overflow: hidden;
    }
    .my_num{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        color: #fff;
    }
    .my_num p{
        font-size: 0.33rem;
    }
    .my_num span{
        font-size: 0.2rem;
        line-height: 0.36rem;
        height: 0.36rem;
        background: rgba(242,242,242,0.57);
        border-radius: 0.067rem;
        padding: 0 0.1rem;
    }
    .my_link_table{
        width: 6.82rem;
        height: 1.84rem;
        margin:0 auto 0.75rem;
        background: #fff;
        border-radius: 0.134rem;
        -moz-box-shadow:5px 5px 10px #F1F1F1;
        -webkit-box-shadow:5px 5px 10px #F1F1F1;
        box-shadow:5px 5px 10px #F1F1F1;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .my_link_table a{
        /*width: 0.86rem;*/
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .my_link_table a img{
        /*width: 100%;*/
        width: 0.4rem;
    }
    .my_link_table a span{
        font-size: 0.22rem;
        color: #999;
        font-weight: 500;
        margin-top: 0.22rem;
    }
    .my_link_list{
        width: 6.13rem;
        margin: 0 auto 0.97rem;
    }
    .my_link_list a{
        width: 100%;
        height: 0.76rem;
        border-bottom: 0.02rem solid #ececec;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .my_link_list b{
        font-size: 0.25rem;
        color: #999;
        font-weight: 500;
    }
    .my_link_list .title{
        width: 1rem;
    }
</style>