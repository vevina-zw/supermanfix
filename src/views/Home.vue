<template>
    <div class="content home">
        <PageTheme imgTitle="index" title="首页" :isGoBack="false">
            <div class="index_banner">
                <mt-swipe :auto="4000">
                    <mt-swipe-item><img src="../assets/images/index_banner1.png"></mt-swipe-item>
                    <mt-swipe-item><img src="../assets/images/index_banner2.png"></mt-swipe-item>
                    <mt-swipe-item><img src="../assets/images/index_banner3.png"></mt-swipe-item>
                </mt-swipe>
            </div>
<!--            <div class="index_order">
                <img src="../assets/images/index_item1.png">
                <img src="../assets/images/index_item2.png">
                <img src="../assets/images/index_item3.png">
                <img src="../assets/images/index_item4.png">
            </div>-->
            <ul class="index_order">
                <li>
                    <img src="../assets/images/index_item_icon1.png">
                    免上门费
                </li>
                <li>
                    <img src="../assets/images/index_item_icon2.png">
                    维修录像
                </li>
                <li>
                    <img src="../assets/images/index_item_icon3.png">
                    严选品质
                </li>
                <li>
                    <img src="../assets/images/index_item_icon4.png">
                    超长质保
                </li>
            </ul>
        </PageTheme>
        <div class="index_place_order">
            <div class="place_order_btn">
                <router-link to="/selectModel"><img src="../assets/images/index_order1.png"></router-link>
                <router-link to="/oneCheck"><img src="../assets/images/index_order2.png"></router-link>
            </div>
            <div class="place_order_time">
                <!--<img class="title" src="../assets/images/index_order_title.png">-->
                <b>实时订单</b>
                <MyMarquee :lists="lists"></MyMarquee>
            </div>
        </div>
        <div class="index_repair">
            <div class="left">
                <router-link to="/selectModel"><img src="../assets/images/index_repair1.png"></router-link>
            </div>
            <div class="right">
                <router-link to="/selectModel"><img src="../assets/images/index_repair2.png"></router-link>
                <router-link to="/upgrade"><img src="../assets/images/index_repair3.png"></router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import MyMarquee from '../components/MyMarquee'
    import PageTheme from  '../components/PageTheme'
    export default {
        name: "Home.vue",
        data (){
            return {
                lists: [
                    '**** 预约维修****'
                ]
            }
        },
        components: {MyMarquee, PageTheme},
        methods: {
            getlastOrders(){
                this.$axios.post('/api/order/lastOrders')
                    .then(res=>{
                        console.log(res);
                        this.lists = res.data.data.map(item=>{
                            let malfunctionName = item.malfunctionName? item.malfunctionName: '';
                            return `${item.contactPhone}预约维修${malfunctionName}`
                        })
                    })
            }
        },
        mounted() {
            this.getlastOrders();
        }
    }
</script>

<style scoped>
    .home{
        background: #efefef;
    }
    .home >>> .index_theme{
        background-color: #fff;
    }
    .home >>> .index_theme .title img{
        height:0.34rem;
    }
    .home >>> .index_theme .title span{
        /*font-size: 0.35rem;*/
        font-size: 0.32rem;
    }
    .index_banner{
        width: 6.9rem;
        height:3.64rem;
        margin:0 auto;
        padding-top: 0.7rem;
    }
    .index_banner img{
        width: 100%;
        height: 100%;
    }
    .index_order{
        width: 6.9rem;
        height:auto;
        margin:0 auto;
    }
    .index_order{
        height: 1.17rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .index_order > img{
        width: 0.688rem;
    }
    .index_order li{
        width: 25%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 0.22rem;
        color: #848484;
        font-weight: 600;
    }
    .index_order li img{
        width: 0.435rem;
        margin-bottom: 0.05rem;
    }
    .index_place_order,.index_repair{
        width: 6.9rem;
        height:auto;
        padding:0.27rem 0.3rem 0;
        background: #fff;
        margin-bottom: 0.09rem;
    }
    .place_order_btn{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .place_order_btn a{
        width: 345rem;
    }
    .place_order_btn a img{
        width: 100%;
    }
    .place_order_time{
        width: 100%;
        height: 0.72rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .place_order_time .title{
        width:1.05rem;
        margin-right:0.3rem;
    }
    .place_order_time >b {
        width:1.05rem;
        margin-right:0.3rem;
        font-size: 0.25rem;
        line-height: 0.4rem;
        font-weight: 500;
    }
    .index_repair{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding:0.27rem 0.3rem;
    }
    .index_repair .left{

    }
    .index_repair .left img{
        width: 3rem;
    }
    .index_repair .right{
        height: 2.96rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .index_repair .right img{
        width:3.73rem;
    }
</style>