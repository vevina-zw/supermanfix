<template>
    <div class="content order">
        <ul v-if="haveOrder" class="order_list">
<!--            <li>
                <router-link to="/orderDetail">
                    <div class="title">
                        <span>维修订单</span>
                        <span>已取消</span>
                    </div>
                    <div class="cont">
                        <div class="left">
                            <p>iphone XS Max</p>
                            <div>
                                <span>外屏碎</span>
                                <span>32G</span>
                            </div>
                        </div>
                        <div class="right">
                            <p>下单时间：2019-03-08  09:02:22</p>
                            <p>订单编号：19012867404</p>
                        </div>
                    </div>
                </router-link>
            </li>-->
            <li v-for="(item,index) in orderLists" :key="index">
                <router-link :to="{name:'orderDetail',query:{orderId:item.orderId}}"
                >
                    <div class="title">
                        <span v-if="item.orderType == 1">维修订单</span>
                        <span v-if="item.orderType == 2">内存升级</span>
                        <span v-if="item.orderType == 3">保险</span>
                        <span v-if="item.orderType == 7">一键下单</span>
                        <span>{{item.status}}</span>
                    </div>
                    <div class="cont">
                        <div class="left">
                            <p v-if="item.brandModelName">{{item.brandModelName}}</p>
                            <p v-else>一键下单</p>

                            <div v-if="item.malfunctionName">
                                <span v-for="malItem in item.malfunctionName.split(',')">{{malItem}}</span>
                                <!--<span>32G</span>-->
                            </div>
                        </div>
                        <div class="right">
                            <p>下单时间：{{item.orderTime}}</p>
                            <p>订单编号：{{item.orderId}}</p>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
        <img v-if="!haveOrder" class="order_list_noData" src="../../assets/images/order_list_noData.png">
    </div>
</template>

<script>
    export default {
        name: "Order",
        data(){
          return{
              haveOrder: true,//是否有订单
              orderLists: [],//订单列表
          }
        },
        computed: {
            userInfo(){
                return this.$store.getters.user
            }
        },
        methods: {
            getOrderList(){
                this.$axios.post('/api/order/list',{
                    phone: this.userInfo.phone,
                    token: localStorage.userToken,
                }).then(res => {
                        console.log(res);
                        if(res.data.code == '1'){
                            if(res.data.data.length <= '0'){//无订单
                                this.haveOrder = false;
                            }else{
                                this.orderLists = res.data.data
                            }
                        }
                    });
            }
        },
        created () {
            //防止页面刷新,vuex:store失效
            //在页面加载时读取localStorage里的状态信息
            if (localStorage.getItem("store") ) {
                this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))))
            }
        },
        mounted () {
            document.querySelector('body').setAttribute('style', 'background:#fff;');
            this.getOrderList()
        },
        beforeDestroy () {
            document.querySelector('body').removeAttribute('style')
        }
    }
</script>

<style scoped>
    .order_list{
        width: 6.8rem;
        margin: 0 auto;
    }
    .order_list li{
        margin: 0.177rem 0;
        border-radius: 0.134rem;
        overflow: hidden;
        -moz-box-shadow:0px 5px 10px #F1F1F1;
        -webkit-box-shadow:0px 5px 10px #F1F1F1;
        box-shadow:0px 5px 10px #F1F1F1;
    }
    .order_list .title{
        width: 6.8rem;
        height: 0.667rem;
        background: url(../../assets/images/text_bg3.png) no-repeat;
        background-size: 100% 100%;
        box-sizing: border-box;
        padding: 0 0.26rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.25rem;
        color: #fff;
        font-weight: bold;
    }
    .order_list .cont{
        width: 6.8rem;
        box-sizing: border-box;
        padding: 0 0.26rem;
        min-height: 1.847rem;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .order_list .cont >div{
        min-height: 0.96rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .order_list .cont .left{
        flex: 1;
    }
    .order_list .cont .left p{
        font-size: 0.2667rem;
        color: #424242;
    }
    .order_list .cont .left span{
        height: 0.313rem;
        line-height: 0.313rem;
        padding: 0 0.2rem;
        font-size: 0.186rem;
        color: #7b7b7b;
        margin-right: 0.167rem;
        margin-top: 0.1rem;
        background: #f2f2f2;
        border-radius: 0.067rem;
        display: inline-block;
    }
    .order_list .cont .right{
        width: 3.65rem;
        font-size: 0.24rem;
        color: #838383;
    }
    .order_list_noData{
        width: 4.6rem;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
</style>