<template>
    <div class="content pointsDetail">
        <PageHeader headerTitle="成长值明细" :isBorderBottom="false"></PageHeader>
        <div class="points_amount">
            <span>{{pointsNum}}</span>
        </div>
        <div class="points_getWay">
            <p>如何获得成长值：</p>
            <p>1.下单维修金额1:1转化为成长值</p>
            <p>2.完成任务可以获得相应成长值</p>
            <p><small>(注：目前仅推荐朋友下单成功维修可以获得成长值，其他未接入成长值的产品 是暂时无法获得成长值的哦～)</small></p>
        </div>
        <ul class="points_list">
            <li v-if="points.length > 0" v-for="(item,index) in points">
                <div class="left">
                    <h1>{{item.title}}</h1>
                    <p>{{item.bizTime}}</p>
                </div>
                <span class="right">+{{item.experience}}</span>
            </li>
            <li v-if="points.length <= 0" class="noDetail">您暂无成长值哦~</li>
        </ul>
    </div>
</template>

<script>
    import PageHeader from '../../components/PageHeader'
    export default {
        name: "PointsDetail",
        components: {PageHeader},
        data(){
            return{
                pointsNum: '',//成长值总数
                points: [],//成长值明细
            }
        },
        methods:{
            getPoints(){
                this.$axios.post("/api/my/experienceDetails",{
                    phone: this.userInfo.phone,
                    token: localStorage.userToken,
                }).then(res => {
                    console.log(res);
                    if(res.data.code = '1'){
                        this.pointsNum = res.data.data.experience;
                        this.points = res.data.data.list;
                    }
                })
            }
        },
        computed: {
            userInfo(){
                return this.$store.getters.user
            }
        },
        created(){
            //防止页面刷新,vuex:store失效
            //在页面加载时读取localStorage里的状态信息
            if (localStorage.getItem("store") ) {
                this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))));
            }

            this.getPoints();
        },
        mounted () {
            document.querySelector('body').setAttribute('style', 'background:#fff');
        },
        beforeDestroy () {
            document.querySelector('body').removeAttribute('style');
        }
    }
</script>

<style scoped>
    .points_amount{
        width: 7rem;
        height: 3.27rem;
        background: url("../../assets/images/points_bg.png") no-repeat;
        background-size: 100% 100%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
    }
    .points_amount span{
        font-size: 0.5rem;
        color: #fff;
        margin-top: 0.9rem;
    }
    .points_getWay{
        width: 6.8rem;
        margin: 0.36rem auto;
    }
    .points_getWay p{
        font-size: 0.24rem;
        color: #a5a5a5;
        line-height: 0.447rem;
    }
    .points_getWay p small{
        font-size: 0.22rem;
        color: #d8645a;
        line-height: 0.353rem;
        display: block;
    }
    .points_list{
        width: 6.8rem;
        margin: 0 auto 0.36rem auto;
        background: #fff;
        border-radius: 0.1333rem;
        overflow:hidden;
        box-sizing: border-box;
        padding: 0 0.346rem;
        -moz-box-shadow:0px 0px 10px #F0EFEF;
        -webkit-box-shadow:0px 0px 10px #F0EFEF;
        box-shadow:0px 0px 10px #F0EFEF;
    }
    .points_list li{
        height: 1.08rem;
        border-bottom: 0.0267rem solid #f1f1f1;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .points_list li:last-child{
        border-bottom: none;
    }
    .points_list .right{
        font-size: 0.35rem;
        color: #d8645a;
    }
    .points_list .left{
        height: 0.8rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .points_list .left h1{
        font-size: 0.26rem;
        color: #616161;
        font-weight: 500;
    }
    .points_list .left p{
        font-size: 0.23rem;
        color: #a5a5a5;
    }

    .points_list .noDetail{
        font-size: 0.23rem;
        color: #616161;
        justify-content: center;
    }
</style>