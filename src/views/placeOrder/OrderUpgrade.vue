<template>
    <div class="content orderUpgrade">
        <PageHeader headerTitle="内存升级"></PageHeader>
        <div class="upgrade" ref="scroller">
            <ul>
                <!--            <li @click="selectMemory">
                                <div class="title">iphone XS Max
                                    &lt;!&ndash;<img class="arrow_right" src="../../assets/images/icon_arrow_down.png">&ndash;&gt;
                                    <span class="arrow">
                                        <i class="fa fa-angle-right"></i>
                                        &lt;!&ndash;<i class="fa fa-angle-down"></i>&ndash;&gt;
                                    </span>
                                </div>
                                <ol class="memory" style="display: none;">
                                    <li>
                                        <router-link to="perfectInfo">32G</router-link>
                                    </li>
                                    <li>
                                        <router-link to="perfectInfo">64G</router-link>
                                    </li>
                                    <li>
                                        <router-link to="perfectInfo">128G</router-link>
                                    </li>
                                    <li>
                                        <router-link to="perfectInfo">256G</router-link>
                                    </li>
                                </ol>
                            </li>-->
                <li v-for="(item,index) in brandModels" :key="index"
                    @click="getMemory(item)" :class="{active: activeModelId == item.brandModelId}">
                    <div class="title">{{item.brandModelName}}
                        <!--<img class="arrow_right" src="../../assets/images/icon_arrow_down.png">-->
                        <span class="arrow">
                        <i class="fa fa-angle-down" v-if="activeModelId == item.brandModelId"></i>
                        <i class="fa fa-angle-right" v-else></i>
                    </span>
                    </div>
                    <ol class="memory" v-if="activeModelId == item.brandModelId">
                        <li v-for="(item,index) in memoryLists" :key="index"
                            @click.stop="selectMemory(item)"
                            :class="{active: activeMemory == item.memory}">
                            {{item.memory}}G
                        </li>
                    </ol>
                </li>
            </ul>
        </div>
        <Handle :amountDesc="handleData.amountDesc" :discountDesc="handleData.discountDesc">
            <!--<router-link v-if="malfunctionIds.length>0" class="next_btn" :to="{name:'perfectInfo',query:{malfunctionIds:JSON.stringify(malfunctionIds),brandModelId:activeModelId,brandModelName,handleData:JSON.stringify(handleData),orderType}}">下一步</router-link>-->
            <div v-if="malfunctionIds.length>0" class="next_btn"  @click="goToPerfectInfo">下一步</div>
        </Handle>
    </div>
</template>

<script>
    import PageHeader from '../../components/PageHeader'
    import Handle from '../../components/Handle'
    import BScroll from 'better-scroll'
    export default {
        name: "Upgrade",
        components: {PageHeader,Handle},
        data(){
          return{
              scroll : null,

              handleData: {
                  amountDesc: '¥0',//总价
                  discountDesc: '',//优惠了多少——(会员折扣便宜**元)
              },

              brandModels: [],//品牌型号
              activeModelId:'',//选中的机型id
              memoryLists: [],//某手机型号=》内存及价格
              activeMemory: '',//选中的内存id

              malfunctionIds:[],//所有选中故障/内存升级id，下单接口要用
              brandModelName: '',//机型

              orderType: '2',//1维修价格，2.内存升级价格,3保险价格
          }
        },
        computed: {
            userInfo(){
                return this.$store.getters.user
            }
        },
        methods: {
            initScroll(){
                this.scroll = new BScroll(this.$refs.scroller,{
                    scrollY: true,
                    click: true
                });
            },
            refreshScroll(){
                this.scroll.refresh();
            },
            getModel(){//只有苹果手机才有内存升级，根据苹果品牌id获取所有的机型
                //苹果品牌id
                let id = "c4c46eb80cab4d8e8a0d3786e280f5b9";
                //请求接口
                //2019.9.9加 from=2表示是内存升级，不传表示是其他地方在调用
                this.$axios.post("/api/brand/"+id,{from:2})
                    .then(res => {
                        this.brandModels = res.data.data[0].list;
                        console.log(this.brandModels);
                    })
            },
            getMemory(item){
                //样式
                if(this.activeModelId != item.brandModelId){//点击态不为当前点击的，则点击态切换为当前点击的
                    this.activeModelId = item.brandModelId;
                }else if(this.activeModelId == item.brandModelId){//点击态为当前点击的，则点击态去除
                    this.activeModelId = '';
                }

                this.brandModelName = item.brandModelName;

                //根据型号id 获取所有的内存及价格
                this.$axios.post("/api/brand/malPrice/"+item.brandModelId,{
                    phone: this.userInfo.phone,
                    token: localStorage.userToken,
                    type: this.orderType,//1维修价格，2.内存升级价格,3保险价格
                }).then(res => {
                    console.log(res);
                    // this.memoryLists = res.data.data;
                    if(res.data.data.length>0){
                        this.memoryLists = res.data.data[0].list;
                    }
                })
            },
            selectMemory(item){//点击内存，获取价格
                console.log(item);
                //样式
                this.activeMemory = item.memory;

                this.malfunctionIds = [];//单选，之前的清空
                this.malfunctionIds.push(item.malfunctionId);

                //优惠了的价格
                /*let discount = this.$utils.Subtr(item.price,item.discountedPrice);
                this.handleData.amountDesc = isNaN(item.price) ? '待检测' : `¥${item.price}`;
                this.handleData.discountDesc = (isNaN(discount) ||  discount=='0') ? ' ' : `(会员折扣便宜${discount}元)`;*/

                this.resetPrice();
            },
            resetPrice(){//计算价格 接口
                let malfunctionIds = this.$utils.getStringByArr(this.malfunctionIds);
                if(!malfunctionIds){
                    this.handleData.amountDesc = '¥0';
                    this.handleData.discountDesc = ' ';
                    return
                }

                this.$axios.post("/api/order/getOrderPrice",{
                    phone: this.userInfo.phone ? this.userInfo.phone : '',
                    token: localStorage.userToken ? localStorage.userToken : '',
                    couponIds: '',//优惠券id(可为空)
                    malfunctionIds,//故障id(不能为空)
                }).then(res => {
                    console.log(res);
                    if(res.data.code == '1'){
                        this.VIPDiscount = res.data.data.customerDiscount;
                        if(res.data.data.priceCleared == 1){ //1价格确定;2价格未确定
                            console.log('计算使用会员折扣后价格');
                            this.handleData.amountDesc = `¥${res.data.data.dealAmount}`;
                            this.handleData.discountDesc = res.data.data.customerDiscountAmount=='0' ? ' ' : `(会员折扣便宜${res.data.data.customerDiscountAmount}元)`;
                        }else if(res.data.data.priceCleared == 2){
                            this.handleData.amountDesc = '待检测';
                            this.handleData.discountDesc = ' ';
                        }
                    }else{//接口调用不成功
                        this.malfunctionIds = [];
                    }
                })
            },
            goToPerfectInfo(){
                this.$router.push({
                    name:'perfectInfo',
                    query:{
                        malfunctionIds:JSON.stringify(this.malfunctionIds),
                        brandModelId:this.activeModelId,
                        brandModelName:this.brandModelName,
                        handleData:JSON.stringify(this.handleData),
                        orderType:this.orderType
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

            this.getModel();
        },
        mounted () {
            document.querySelector('body').setAttribute('style', 'background:#fff;');

            if(!this.scroll){
                this.initScroll()
            }else{
                this.refreshScroll()
            }
        },
        beforeDestroy () {
            document.querySelector('body').removeAttribute('style')
        }
    }
</script>

<style scoped>
    .upgrade{
        width: 7.5rem;
        position: absolute;
        top: 0.9367rem;
        bottom: 1.16rem;
        /*left:0;*/
        /*right:0;*/
        overflow: hidden;
    }
    .upgrade ul>li{
        width: 6.84rem;
        box-sizing: border-box;
        margin: 0 0.33rem;
        font-size: 0.23rem;
        color: #424242;
        border-bottom: 0.02rem solid #f2f1f2;
    }
    .upgrade li div.title{
        width:100%;
        height: 1.28rem;
        color: #424242;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .upgrade .memory{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 0.54rem;
    }
    .upgrade .memory li{
        border: 0.02rem solid #d0d0d0;
        border-radius: 0.1rem;
        width: 1.56rem;
        height: 0.64rem;
        margin: 0.11rem 0.14rem 0.11rem 0;

        font-size: 0.23rem;
        color: #525252;
        text-align: center;
        line-height: 0.64rem;
    }
    .upgrade .memory li:nth-child(4n){
        margin-right: 0;
    }
    .upgrade .memory li.active{
        border-color: #cf534a;
        color: #e24d46;
    }
</style>