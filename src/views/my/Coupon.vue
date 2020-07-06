<template>
    <div class="content">
        <PageHeader headerTitle="优惠券" :isBorderBottom='false'></PageHeader>
        <ul class="coupon_nav">
            <li @click="getCouponList(0)" :class="{active: navActiveId=='0'}" >未使用</li>
            <li @click="getCouponList(1)" :class="{active: navActiveId=='1'}" >已使用</li>
            <li @click="getCouponList(-2)" :class="{active: navActiveId=='-2'}" >已过期</li>
        </ul>

        <ul class="coupon_list" v-if="!isNoData">
            <li v-for="(item,index) in couponLists" :key="index"
                :class="{valid: item.couponStatus == 0}">
                <!--couponStatus状态:-2过期;-1无效;0待使用;1已使用;;;-1暂不用-->
                <div class="header">
                    <h1>{{item.couponName}}</h1>
                    <h2 v-if="item.couponStatus == 0" :class="{checked: selectedCouponId == item.customerCouponId}">未使用
                        <i class="check_btn" @click="selectCoupon(item)" v-if="isUseIcon"></i>
                    </h2>
                    <h2 v-else-if="item.couponStatus == 1">已使用</h2>
                    <h2 v-else-if="item.couponStatus == -2">已过期</h2>
                </div>
                <div class="content">
                    <p><span>使用说明：</span>{{item.displayLabel}}</p>
                    <p><span>有效期：</span>{{item.startTime}} — {{item.endTime}}</p>
                </div>
            </li>

<!--            <li class="valid">
                <div class="header">
                    <h1>15元新人通用券</h1>
                    <h2>未使用</h2>
                </div>
                <div class="content">
                    <p><span>使用说明：</span>仅限扩容使用，满0元使用</p>
                    <p><span>有效期：</span>2019-01-15—2019-09-15</p>
                </div>
            </li>
            <li>
                <div class="header">
                    <h1>15元新人通用券</h1>
                    <h2>已使用</h2>
                </div>
                <div class="content">
                    <p><span>使用说明：</span>仅限扩容使用，满0元使用</p>
                    <p><span>有效期：</span>2019-01-15—2019-09-15</p>
                </div>
            </li>
            <li>
                <div class="header">
                    <h1>15元新人通用券</h1>
                    <h2>已过期</h2>
                </div>
                <div class="content">
                    <p><span>使用说明：</span>仅限扩容使用，满0元使用</p>
                    <p><span>有效期：</span>2019-01-15—2019-09-15</p>
                </div>
            </li>-->
        </ul>

        <div v-if="isNoData" class="coupon_noData">
            <img src="../../assets/images/coupon_noData.png">
            <p>暂无优惠劵～</p>
            <div class="layer_btn">
                <span @click="getCoupon()">如何获得优惠劵</span>  |  <span @click="useCoupon()">优惠劵说明</span>
            </div>
        </div>
        <div v-if="isGetWay" class="coupon_layer">
                <div class="header">
                    <p>如何获得优惠劵</p>
                    <i @click="closeLayer()"></i>
                </div>
                <div class="content">
                    <p>1.新用户将获得10元无门槛优惠劵。</p>
                    <p>2.您的好友推荐您注册，您将获得15元优惠劵。</p>
                    <p>3.您生日当月，将获得20元无门槛优惠劵</p>
                </div>
        </div>
        <div v-if="isUseDesc" class="coupon_layer">
            <div class="header">
                <p>优惠劵说明</p>
                <i @click="closeLayer()"></i>
            </div>
            <div class="content">
                <p>1.每个订单只能使用一张优惠劵，无法与其他优惠劵或者优惠活动同时使用。</p>
                <p>2.优惠劵不设找零，不折线，仅限使用一次。</p>
                <p>3.如使用后发生退款，优惠劵不作为退款款项。</p>
                <p>4.优惠劵仅限在超人修微信公众号下单使用。</p>
                <p>5.本活动最终解释权归超人修所以。</p>
                <p>1.新用户将获得10元无门槛优惠劵。</p>
                <p> 2.您的好友推荐您注册，您将获得15元优惠劵。</p>
                <p>3.您生日当月，将获得20元无门槛优惠劵</p>
            </div>
        </div>
    </div>
</template>

<script>
    import PageHeader from '../../components/PageHeader'
    export default {
        name: "Coupon",
        components: {
            PageHeader
        },
        data(){
            return{
                navActiveId: '0',//导航选中，高亮
                couponLists: [],//优惠券列表
                isNoData: false,//暂无数据 是否展示
                isGetWay: false,//如何获得优惠劵 是否展示
                isUseDesc: false,//优惠劵说明 是否展示

                fromPath:'',//哪个页面过来，判断是否下单页跳转过来

                selectedCouponId:'',//优惠券选中，高亮
                isUseIcon:false,//可用优惠券是否有使用按钮
            }
        },
        computed: {
            userInfo(){
                return this.$store.getters.user
            }
        },
        methods : {
            getCouponList(status){//获取优惠券
                // 导航样式
                this.navActiveId = status;

                this.$axios.post("/api/coupon/list",{
                    phone: this.userInfo.phone,
                    token: localStorage.userToken,
                    couponStatus : status,//状态:-2过期;-1无效;0待使用;1已使用; -1暂时不用(可空)
                }).then(res => {
                    console.log(res);
                    if(res.data.data.length <= 0){
                        this.isNoData = true;
                    }else{
                        this.couponLists = res.data.data;
                        this.isNoData = false;
                    }
                })
            },
            selectCoupon(item){//下单页=>选择优惠券
                if(this.fromPath == 'perfectInfo' && item.couponStatus==0){
                    if(this.selectedCouponId == item.customerCouponId){//该张已选择，去除选择
                        this.selectedCouponId = '';
                        sessionStorage.removeItem('couponInfo');
                    }else{//该张未选择，则选择
                        this.selectedCouponId = item.customerCouponId;
                        sessionStorage.setItem('couponInfo', JSON.stringify(item));
                    }
                    this.$router.go(-1);
                }
            },
            getCoupon(){
                this.isGetWay = true;
                this.isNoData = true;
            },
            useCoupon(){
                this.isUseDesc = true;
                this.isNoData = true;
            },
            closeLayer(){
                this.isNoData = true;
                this.isGetWay = false;
                this.isUseDesc = false;
            }
        },
        created(){
            //防止页面刷新,vuex:store失效
            //在页面加载时读取localStorage里的状态信息
            if (localStorage.getItem("store") ) {
                this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))));
            }

/*            this.fromPath = this.$route.query.fromPath;
            if(this.fromPath == 'perfectInfo'){//展示是否选中的图标
                this.isUseIcon = true;

                let couponInfo = JSON.parse(sessionStorage.getItem('couponInfo'));
                if(couponInfo){
                    this.selectedCouponId = couponInfo.customerCouponId
                }else{
                    this.selectedCouponId = ''
                }
                console.log('选中的优惠券id↓');
                console.log(this.selectedCouponId);
            }else{
                this.isUseIcon = false
            }
            this.getCouponList(0);*/
        },
        mounted () {
            document.querySelector('body').setAttribute('style', 'background:#f7f7f7');
        },
        beforeDestroy () {
            document.querySelector('body').removeAttribute('style');
        },
        activated(){
            this.fromPath = this.$route.query.fromPath;
            if(this.fromPath == 'perfectInfo'){
                //展示是否选中的图标
                this.isUseIcon = true;

                //选中了哪个优惠券
                let couponInfo = JSON.parse(sessionStorage.getItem('couponInfo'));
                if(couponInfo){
                    this.selectedCouponId = couponInfo.customerCouponId
                }else{
                    this.selectedCouponId = ''
                }
                console.log('选中的优惠券id↓');
                console.log(this.selectedCouponId);
            }else{
                this.isUseIcon = false;
            }
            this.getCouponList(0);
        }
    }
</script>

<style scoped>
    .coupon_nav{
        width: 100%;
        height: 1.04rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .coupon_nav li{
        flex: 1;
        height: 1.04rem;
        line-height: 1.04rem;
        background: #fff;
        font-size: 0.266rem;
        color: #adacac;
        text-align: center;
        position: relative;
    }
    .coupon_nav li.active{
        color: #424242;
    }
    .coupon_nav li.active:after{
        content: '';
        display: block;
        width: 0.5rem;
        height: 0.08rem;
        background: #d8645a;
        position: absolute;
        bottom:0;
        left:50%;
        margin-left:-0.25rem;
    }
    .coupon_noData{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .coupon_noData >img{
        width: 1.93rem;
    }
    .coupon_noData > p{
        font-size: 0.23rem;
        color: #adacac;
        line-height: 0.6rem;
    }
    .layer_btn{
        font-size: 0.2rem;
        color: #c7c7c7;
    }

   .coupon_layer{
        /*display: none;*/
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 999;
        transform: translate(-50%,-50%);
    }
    /*     .coupon_layer>div,.coupon_list li>div{
            width: 6.8rem;
            box-sizing: border-box;
            padding: 0 0.33rem;
            border-radius: 0.133rem;
            background: #fff;
        }
        .coupon_layer .header,.coupon_list .header{
            height: 0.8rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.266rem;
            color: #4b4b4b;
            -moz-box-shadow:0px -5px 10px #EEEEEE;
            -webkit-box-shadow:0px -5px 10px #EEEEEE;
            box-shadow:0px -5px 10px #EEEEEE;
        }
        .coupon_layer .header i{
            width: 0.226rem;
            height: 0.226rem;
            display: block;
            background: url("../../assets/images/icon_fork.png") no-repeat;
            background-size: 100% 100%;
        }
        .coupon_layer .content,.coupon_list .content{
            font-size: 0.25rem;
            color: #afaeae;
            line-height: 0.4rem;
            padding: 0.33rem;
            margin-top: 0.033rem;
            -moz-box-shadow:0px 5px 10px #EEEEEE;
            -webkit-box-shadow:0px 5px 10px #EEEEEE;
            box-shadow:0px 5px 10px #EEEEEE;
        }*/
    .coupon_list{
        width: 6.8rem;
        margin: 0.22rem auto 0;
    }
    .coupon_list li{
        margin-bottom: 0.22rem;
    }
    .coupon_list .header h1{
        font-size: 0.3rem;
        color: #857f7f;
    }
    .coupon_list .header h2{
        font-size: 0.267rem;
        color: #d8645a;
        display: flex;
        align-items: center;
        height: 0.4rem;
        line-height: 0.4rem;
    }
    .coupon_list li.valid .header h1{
        color: #d8645a;
    }
    .coupon_list .content p{
        color: #8e8e8e;
    }
    .coupon_list li.valid .content p span{
        color: #3b3a3a;
    }
</style>