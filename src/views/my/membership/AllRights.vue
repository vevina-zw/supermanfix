<template>
    <div class="content allRights">
        <PageHeader headerTitle="全部特权" :isBorderBottom='false' :isWhite='false'></PageHeader>
        <RightList v-for="(item,index) in allRightLists" :key="index"
                   :listTitle="item.listTitle" :listLink="item.listLink" :listData="item.listData" :isActive="item.isActive"></RightList>
    </div>
</template>

<script>
    import PageHeader from '../../../components/PageHeader'
    import RightList from "../../../components/RightList"
    export default {
        name: "AllRights",
        components: {
            PageHeader,
            RightList
        },
        data(){
            return{
                allRightLists: [
/*                    {
                        listTitle: "V1会员特权",
                        listLink: null,
                        listData: [
                            {listImg: require('../../../assets/images/right_img1.png'),listH1: '双倍成长',listH2: '生日快速升级'}
                        ]
                    }*/
                ],
                myLevel:'',//我当前等级
            }
        },
        methods:{
            getAllRights(){//获取所有权益
                this.$axios.post("/api/my/allrights").then(res => {
                    console.log(res);

                    let allRights = res.data.data;
                    let vRight = null;
                    this.allRightLists = allRights.map((item,index)=>{
                        let listTitle = '';
                        let isActive = false;
                        if(this.myLevel== item.level){
                            listTitle = `V${item.level}会员特权（当前我是V${item.level}${item.levelName}）`;
                            isActive = true;
                        }else{
                            listTitle = `V${item.level}会员特权`;
                        }
                        // let listTitle = this.myLevel== item.level ? `V${item.level}会员特权（当前我是V${item.level}会员）` : `V${item.level}会员特权`;
                        let listLink = null;
                        let listData = [];

                        if(item.newExperience){//新业务免费体验 boolean
                            listData.push({listImg: require('../../../assets/images/right_img8.png'),listH1: '新业务免费体验',listH2: '免费名额'})
                        }
                        if(item.birthCare){//生日特权优惠券
                            listData.push({listImg: require('../../../assets/images/right_img4.png'),listH1: '生日特权优惠券',listH2: `${item.birthCouponAmount}元`})
                        }
                        if(item.discount){//折扣 integer
                            listData.push({listImg: require('../../../assets/images/right_img7.png'),listH1: '维修折扣',listH2: `享${item.discount}折`})
                        }
                        if(item.freeReinstall !=0){//免费系统重装次数 integer,无限次数为999
                            let numString = item.freeReinstall==999 ? '无限次数' : `一年/${item.freeReinstall}次` ;
                            listData.push({listImg: require('../../../assets/images/right_img1.png'),listH1: '免费系统重装',listH2: numString})
                        }
                        if(item.scheduleFirst){//排期优先 boolean
                            listData.push({listImg: require('../../../assets/images/right_img3.png'),listH1: '排期优先',listH2: '优先安排维修'})
                        }
                        if(item.goldService){//金牌工程师服务 boolean
                            listData.push({listImg: require('../../../assets/images/right_img5.png'),listH1: '金牌工程师服务',listH2: '七星级体验'})
                        }

                        return{listTitle,listLink,listData,isActive}
                    })
                })
            },
        },
        created(){
            this.myLevel = this.$route.query.myLevel;
            this.getAllRights();
        }
    }
</script>

<style scoped>

</style>