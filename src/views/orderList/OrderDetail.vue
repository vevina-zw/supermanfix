<template>
    <div class="content orderDetail">
        <PageHeader headerTitle="订单详情"></PageHeader>
        <div class="detail_box detail_head_box">
            <div class="detail_head">
                <div class="detail_head_left">
                    <p>{{orderInfo.brandModelName}}</p>
                    <h1>{{orderInfo.status}}</h1>
                </div>
                <div class="detail_head_right">
                    <p>您的商品已收货完成，请继续使用 您的产品，愿超人修能为您的生活带来更多快乐</p>
                </div>
            </div>
            <img src="../../assets/images/icon_arrow_down_double.png">
        </div>
        <div class="detail_box detail_body_box">
            <ul class="detail_body_list" v-if="orderHistoryVOs.length>0">
                <li v-for="(item,index) in orderHistoryVOs" :key="index">
                    <div class="left">
                        <p>{{item.operatorTime_Date}}</p>
                        <span>{{item.operatorTime_Time}}</span>
                    </div>
                    <div class="right">
                        <h1>{{item.orderStatus}}</h1>
                        <h2>{{item.operatorMemo}}</h2>
                    </div>
                </li>
<!--                <li>
                    <div class="left">
                        <p>03-19</p>
                        <span>01:39</span>
                    </div>
                    <div class="right">
                        <h1>已下单</h1>
                        <h2>亲，您已下单成功</h2>
                    </div>
                </li>
-->
            </ul>
            <p class="detail_warn" v-if="isQualityGuarantee">质保有效期：{{orderInfo.qualityGuaranteeStart}} — {{orderInfo.qualityGuaranteeEnd}}</p>
        </div>
        <!--<a class="btn_pay"><img src="../../assets/images/btn_pay.png"></a>-->
    </div>
</template>

<script>
    import PageHeader from '../../components/PageHeader'
    export default {
        name: "OrderDetail",
        components: {
            PageHeader
        },
        data(){
            return{
                orderInfo:{},
                orderHistoryVOs:[],
                isQualityGuarantee : false,//是否显示质保
            }
        },
        computed: {
            userInfo(){
                return this.$store.getters.user
            }
        },
        methods: {
            getOrderDetail(){
                this.$axios.post('/api/order/detail',{
                    phone: this.userInfo.phone,
                    token: localStorage.userToken,
                    orderId: this.$route.query.orderId
                }).then(res => {
                    console.log(res.data.data);
                    this.orderInfo = res.data.data;
                    //qualityGuaranteeStatus为-1或0时，不显示质保期
                    this.isQualityGuarantee = (this.orderInfo.qualityGuaranteeStatus ==-1 || this.orderInfo.qualityGuaranteeStatus ==0 || !this.orderInfo.qualityGuaranteeStart) ? false : true;
                    //数据结构重组：将yyyy-mm-dd hh:mm:ss分隔成 ['yyyy-mm-dd','hh:mm:ss']
                    let orderHistoryVOs = res.data.data.orderHistoryVOs;//订单操作历史
                    this.orderHistoryVOs = orderHistoryVOs.map(item=>{
                        let operatorTime = item.operatorTime.split(/\s+/);
                        item.operatorTime_Date = operatorTime[0];
                        item.operatorTime_Time = operatorTime[1];
                        return item
                    });
                    console.log(this.orderHistoryVOs);
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
            this.getOrderDetail();
        },
        beforeDestroy () {
            document.querySelector('body').removeAttribute('style')
        }
    }
</script>

<style scoped>
    .detail_box{
        width: 6.8rem;
        background: #fff;
        border-radius: 0.1333rem;
        overflow:hidden;
        -moz-box-shadow:0px 0px 10px #F0EFEF;
        -webkit-box-shadow:0px 0px 10px #F0EFEF;
        box-shadow:0px 0px 10px #F0EFEF;
        margin: 0.33rem auto;
    }
    .detail_head_box{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .detail_head_box >img{
        width: 0.273rem;
        margin: 0.24rem 0 0.127rem;
    }
    .detail_head{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 0.293rem;
    }
    .detail_head_left{
        height: 0.807rem;
        color: #424242;
        position: relative;
        padding: 0 0.3rem;
        border-right: 0.02rem solid #ececec;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .detail_head_left:before {
        content: '';
        width: 0.107rem;
        height: 0.807rem;
        background: #e6514a;
        position: absolute;
        left:0;
        top:0;
        display: block;
    }
    .detail_head_left p{
        font-size: 0.24rem;
    }
    .detail_head_left h1{
        font-size: 0.34rem;
    }
    .detail_head_right{
        flex: 1;
        padding:0 0.3rem;
    }
    .detail_head_right p{
        font-size: 0.22rem;
        color: #848484;
        line-height: 0.28rem;
    }
    .detail_body_box{

    }
    .detail_body_list{
        color: #848484;
        padding: 0.33rem 0;
    }
    .detail_body_list li{
        box-sizing: border-box;
        padding: 0 0.34rem;
        display: flex;
    }
    .detail_body_list .left{
        width: 1.6rem;
        box-sizing: border-box;
        padding-right: 0.3rem;
        text-align: right;
        padding-top: 0.24rem;
    }
    .detail_body_list .left p{
        font-size: 0.23rem;
    }
    .detail_body_list .left span{
        font-size: 0.22rem;
    }
    .detail_body_list .right{
        flex: 1;
        box-sizing: border-box;
        padding: 0.24rem 0 0.24rem 0.3rem;
        border-left: 0.02rem solid #e4e4e4;
        position: relative;
    }
    .detail_body_list .right:before{
        content: '';
        display: block;
        width: 0.09rem;
        height: 0.09rem;
        border-radius: 50%;
        background: #e6514a;
        border: 0.03rem solid #fff;
        border-radius: 50%;
        position: absolute;
        left: -0.085rem;
        top: 0.4rem;
    }
    .detail_body_list .right h1{
        font-size: 0.28rem;
        font-weight: 500;
    }
    .detail_body_list .right h2{
        color: #a6a6a6;
        font-size: 0.22rem;
        font-weight: 500;
    }
    .detail_warn{
        color: #e6514a;
        font-size: 0.186rem;
        text-align: center;
        margin-bottom: 0.15rem;
    }
    .btn_pay{
        width: 1.67rem;
        display: block;
        margin:0.57rem auto 0.57rem;
    }
    .btn_pay img{
        width: 1.67rem;
    }
</style>