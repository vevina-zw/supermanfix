<template>
    <div class="content myRights">
        <PageHeader headerTitle="会员权益" :isBorderBottom='false'></PageHeader>
        <div class="index_theme" :style="{backgroundImage:'url(' + themeBg + ')'}">
            <!--<img class="right_level" src="../../../assets/images/right_v3.png">-->
            <router-link class="right_score" to="points">
                <!--成长值：975 >-->
                成长值：{{experience}}
                <span><i class="fa fa-angle-right"></i></span>
            </router-link>
            <!--            <div class="right_step">
                            <img src="../../../assets/images/right_l_v1.png">
                            <span class="full"><i></i></span>
                            <img src="../../../assets/images/right_l_v2.png">
                            <span class="full"><i></i></span>
                            <img src="../../../assets/images/right_l_v3.png">
                            <span class="half"><i></i></span>
                            <img src="../../../assets/images/right_l_v4.png">
                            <span class="empty"><i></i></span>
                            <img src="../../../assets/images/right_l_v5.png">
                        </div>-->

            <div class="right_step" ref="progressBox">
                <b>V1</b>
                <span><i></i></span>
                <b>V2</b>
                <span><i></i></span>
                <b>V3</b>
                <span><i></i></span>
                <b>V4</b>
                <span><i></i></span>
                <b>V5</b>
                <span><i></i></span>
                <b>V6</b>
            </div>
            <div class="right_warn">
                差{{differExperience}}分升到V{{level+1}}，新特权在等你加油～
                <router-link  to="aboutRights">
                    <img src="../../../assets/images/right_question.png">
                </router-link>
            </div>
        </div>
        <RightList :listTitle="listTitle" :listLink="listLink" :listData="listData" :isAll="isAll"></RightList>
    </div>
</template>

<script>
    import PageHeader from '../../../components/PageHeader'
    import RightList from '../../../components/RightList'
    export default {
        name: "MyRights",
        components: {
            PageHeader,
            RightList
        },
        data(){
            return{
                listTitle: "我的特权",
                listLink: {
                    title: "全部特权",
                    linkPath: "/allRights"
                },
                listData: [
                    /*                    {listImg: require('../../../assets/images/right_img1.png'),listH1: '双倍成长',listH2: '生日快速升级'},
                                        {listImg: require('../../../assets/images/right_img2.png'),listH1: '双倍成长',listH2: '生日快速升级'},
                                        {listImg: require('../../../assets/images/right_img3.png'),listH1: '双倍成长',listH2: '生日快速升级'}*/
                ],
                isAll: false,

                level:'',//等级
                experience:'',//经验值
                differExperience: '',//与下一等级相差多少经验值
                themeBg: '',//背景图片
            }
        },
        computed: {
            userInfo(){
                return this.$store.getters.user
            }
        },
        methods:{
            getMyRights(){//获取我的权益
                this.$axios.post("/api/my/rights",{
                    phone: this.userInfo.phone,
                    token: localStorage.userToken,
                }).then(res => {
                    console.log(res);
                    let data = res.data.data;
                    this.level = data.level;
                    this.experience = data.experience;
                    this.differExperience = this.$utils.Subtr(data.customerRightsVO.maxExperience,data.experience);
                    this.themeBg = require(`../../../assets/images/right_v${data.level}_bg.png`);

                    this.listLink.linkPath = "/allRights?myLevel=" + data.level;

                    this.setProgressBar(data);

                    let myRights = data.customerRightsVO;
                    if(myRights.newExperience){//新业务免费体验 boolean
                        this.listData.push({listImg: require('../../../assets/images/right_img8.png'),listH1: '新业务免费体验',listH2: '免费名额'})
                    }
                    if(myRights.birthCare) {//生日特权优惠券
                        this.listData.push({listImg: require('../../../assets/images/right_img4.png'),listH1: '生日特权优惠券',listH2: `${myRights.birthCouponAmount}元`})
                    }
                    if(myRights.discount){//折扣 integer
                        this.listData.push({listImg: require('../../../assets/images/right_img7.png'),listH1: '维修折扣',listH2: `享${myRights.discount}折`})
                    }
                    if(myRights.freeReinstall !=0){//免费系统重装次数 integer,无限次数为-999
                        let numString = myRights.freeReinstall==999 ? '无限次数' : `一年/${myRights.freeReinstall}次` ;
                        this.listData.push({listImg: require('../../../assets/images/right_img1.png'),listH1: '免费系统重装',listH2: numString})
                    }
                    if(myRights.scheduleFirst){//排期优先 boolean
                        this.listData.push({listImg: require('../../../assets/images/right_img3.png'),listH1: '排期优先',listH2: '优先安排维修'})
                    }
                    if(myRights.goldService){//金牌工程师服务 boolean
                        this.listData.push({listImg: require('../../../assets/images/right_img5.png'),listH1: '金牌工程师服务',listH2: '七星级体验'})
                    }
                })
            },
            setProgressBar(data){//设置等级进度条
                let level = data.level;
                let experience = data.experience;
                let nextExperience = data.customerRightsVO.maxExperience;
                let proportion = (this.$utils.Subtr(nextExperience,experience) / nextExperience) * 100;
                let progressBar = this.$refs.progressBox.querySelectorAll('span');
                progressBar.forEach((item,index)=>{
                    let progressI = item.querySelector('i');
                    progressI.style.width= 0;
                    if(index+1 < level){
                        progressI.style.width= '100%';
                    }else if(index+1 == level){
                        progressI.style.width= proportion+'%';
                    }
                })
            }
        },
        created(){
            //防止页面刷新,vuex:store失效
            //在页面加载时读取localStorage里的状态信息
            if (localStorage.getItem("store") ) {
                this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))));
            }

            this.getMyRights();
        }
    }
</script>

<style scoped>
    .myRights{
        background: #f6f6f6;
    }
    .index_theme{
        width: 7.5rem;
        height: 4.81rem;
        /*background: #fff url(../../../assets/images/right_v3_bg.png) no-repeat top center;*/
        background: #fff no-repeat top center;
        background-size: 7.5rem 4.81rem;
        margin-bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    /*    .right_level{
            width: 0.625rem;
            margin-top:1.35rem;
        }*/
    .right_score{
        font-size: 0.24rem;
        color: #fff;
        margin-top:3rem;
    }
    .right_step{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.26rem;
    }
    .right_step img{
        height: 0.22rem;
    }
    .right_step b{
        font-size : 0.26rem;
        color: #fff;
        height: 0.3rem;
        line-height: 0.3rem;
        font-weight: 500;
    }
    .right_step span{
        width: 0.7rem;
        height: 0.086rem;
        background: rgba(255,255,255,0.15);
        position: relative;
        margin:0.07rem;
    }
    .right_step span i{
        height: 100%;
        background: #fff;
        position: absolute;
        left:0;
        top:0;
    }
    /*    .right_step span.full i{
            width: 100%;
        }
        .right_step span.empty i{
            width: 0;
        }
        .right_step span.half i{
            width: 50%;
        }*/
    .right_warn{
        font-size: 0.22rem;
        color: #b19385;
    }
    .right_warn img{
        width: 0.22rem;
        margin-top: 0.36rem;
    }
</style>