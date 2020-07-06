<template>
    <div class="content selectFault">
        <PageHeader headerTitle="故障选择" :isBorderBottom='false'></PageHeader>
        <div class="order_options">
            <div class="options_color">
                <div class="title">{{brandModelName}}</div>
                <ul>
                    <li v-for="(item,index) in colorLists" :key="index"
                        @click="selectColor(item.color)"
                        :class="{active: activeColor == item.color}"
                    >{{item.color}}</li>
                </ul>
            </div>

            <!--2019.7.11接口有变动，改动后逻辑↓-->
            <div class="options_fault">
                <ul>
                    <li v-for="(classItem,index) in faultsClass" :key="index"
                        @click="selectFaultClass(index)">
                        <div class="head">{{classItem.name}}
                            <span class="arrow">
                                <i class="fa fa-angle-down" v-if="activeFaultsClass.indexOf(index)>-1"></i>
                                <i class="fa fa-angle-right" v-else></i>
                            </span>
                        </div>
                        <ol v-if="activeFaultsClass.indexOf(index)>-1">
                            <li v-for="(item,index) in classItem.list" :key="index"
                                @click.stop="selectFault(item,item.malfunctionId)"
                                :class="{checked: malfunctionIds.indexOf(item.malfunctionId)>=0}">
                                <div class="title">
                                    <h1>{{item.malfunctionName}}</h1>
                                    <h2><font v-if="!isNaN(item.price)">¥</font>{{item.price}}
                                        <i class="check_btn"></i>
                                    </h2>
                                </div>
                                <div class="desc" v-if="item.malfunctionExplain || item.repairPlanDeclare || item.hasQualityGuarantee">
                                    <h3>
                                        <!--故障解释-->
                                        <p>{{item.malfunctionExplain}}</p>
                                        <!--维修方案-->
                                        <p v-if="item.repairPlanDeclare">维修方案：{{item.repairPlanDeclare}}</p>
                                    </h3>
                                    <h2 v-if="item.hasQualityGuarantee">保修期：{{item.qualityGuarantee}}天</h2>
                                </div>
                            </li>
                        </ol>
                    </li>
                </ul>
            </div>

            <!--2019.7.11接口有变动，原逻辑↓-->
            <!--<div class="options_fault">
                <ul>
                    <li>
                        <div class="head">屏幕问题
                            <span class="arrow">
                                <i class="fa fa-angle-down"></i>
                            </span>
                        </div>
                        <ol >
                            &lt;!&ndash;<li :class="{checked: item.active}">&ndash;&gt;
                            <li v-for="(item,index) in faults" :key="index"
                                @click="selectFault(item,item.malfunctionId)"
                                :class="{checked: malfunctionIds.indexOf(item.malfunctionId)>=0}">
                                <div class="title">
                                    <h1>{{item.malfunctionName}}</h1>
                                    <h2><font v-if="!isNaN(item.price)">¥</font>{{item.price}}
                                        <i class="check_btn"></i>
                                    </h2>
                                </div>
                                <div class="desc">
                                    <h3>
                                        <p>外屏碎裂，裂纹，触摸和显示功能全部正常</p>
                                        <p>维修方案：更换屏幕总成，旧屏回收</p>
                                    </h3>
                                    <h2>保修期：90天</h2>
                                </div>
                            </li>
                        </ol>
&lt;!&ndash;                        <ol>
                            <li class="checked">
                                <div class="title">
                                    <h1>外屏碎<small>(触摸显示正常)</small></h1>
                                    <h2>￥299.00<img class="check_btn" src="../../../assets/images/icon_checked.png"></h2>
                                </div>
                                <div class="desc">
                                    <h3>
                                        <p>外屏碎裂，裂纹，触摸和显示功能全部正常</p>
                                        <p>维修方案：更换屏幕总成，旧屏回收</p>
                                    </h3>
                                    <h2>保修期：90天</h2>
                                </div>
                            </li>
                            <li>
                                <div class="title">
                                    <h1>触摸异常</h1>
                                    <h2>￥299.00<img class="check_btn" src="../../../assets/images/icon_unchecked.png"></h2>
                                </div>
                                <div class="desc">
                                    <h3>
                                        <p>外屏碎裂，裂纹，触摸和显示功能全部正常</p>
                                        <p>维修方案：更换屏幕总成，旧屏回收</p>
                                    </h3>
                                    <h2>保修期：90天</h2>
                                </div>
                            </li>
                        </ol>&ndash;&gt;
                    </li>
                </ul>
            </div>-->
        </div>
        <Handle :amountDesc="handleData.amountDesc" :discountDesc="handleData.discountDesc">
            <!--<router-link v-if="malfunctionIds.length>0" class="next_btn" :to="{name:'perfectInfo',query:{malfunctionIds:JSON.stringify(malfunctionIds),brandModelId,brandModelName,handleData:JSON.stringify(handleData),orderType}}">下一步</router-link>-->
            <div v-if="malfunctionIds.length>0" class="next_btn"  @click="goToPerfectInfo">下一步</div>
        </Handle>
    </div>
</template>

<script>
    import Vue from 'vue'
    import PageHeader from '../../../components/PageHeader'
    import Handle from '../../../components/Handle'
    export default {
        name: "SelectFault",
        components: {
            Handle,
            PageHeader
        },
        data(){
            return{
                handleData: {
                    amountDesc: '¥0',//优惠后总价描述
                    discountDesc: '',//优惠了多少描述——(会员折扣便宜**元)
                    amount: 0,//优惠后总价
                    discount: 0,//优惠价——**
                    /*btnText: '下一步',
                    nextPath: '/perfectInfo'*/
                },
                brandModelId: '',//机型id，上一页面传入
                brandModelName: '',//机型，上一页面传入
                colorLists: [],
                activeColor: '',//选中颜色
                faults:[],//故障列表
                malfunctionIds:[],//所有选中故障id，下单接口要用

                orderType: '1',//1维修价格，2.内存升级价格,3保险价格

                faultsClass:{},//故障分类列表
                activeFaultsClass: [],//选中的所以故障类型
            }
        },
        computed: {
            userInfo(){
                return this.$store.getters.user
            }
        },
        methods: {
            getColors(id){//根据型号id获取所有的颜色
                this.$axios.post("/api/brand/colors/"+id)
                    .then(res => {
                        console.log(res);
                        this.colorLists = res.data.data;
                        //console.log(this.colorLists)
                    })
            },
            selectColor(color){//选择颜色
                this.activeColor = color;
            },
            getPrice(id){//根据型号id 获取所有的故障及价格
                this.$axios.post("/api/brand/malPrice/"+id,{
                    phone: this.userInfo.phone,
                    token: localStorage.userToken,
                    type: this.orderType,//1维修价格，2.内存升级价格,3保险价格
                }).then(res => {
                    console.log(res);
/*                    this.faults = res.data.data;

                    //为faults添加select（是否选中）字段，初始值为false
                    this.faults.map(function (item) {
                        Vue.set(item, 'isSelect', false);
                    })*/

                    this.faultsClass = res.data.data;
                    //为faults添加select（是否选中）字段，初始值为false
                    this.faultsClass.map(function (item) {
                        Vue.set(item, 'isSelect', false);
                    });
                })
            },
            selectFaultClass(item){//点击故障类型
                let ind = this.activeFaultsClass.indexOf(item);
                if (ind > -1) {//已存在则从数组中删除
                    this.activeFaultsClass.splice(ind, 1);
                }else{//不存在则存入数据
                    this.activeFaultsClass.push(item);
                }
            },
            selectFault(item,id){//点击故障类型，id为故障id
                //多选样式
/*                if(item.active){
                    Vue.set(item,'active',false)  //为item添加不存在的属性，需要使用vue提供的Vue.set( object, key, value )方法
                }else{
                    Vue.set(item,'active',true)
                }*/

                //存储故障id=>malfunctionIds
                //获取id在malfunctionIds中的下标位置
                let idIndex = this.malfunctionIds.indexOf(id);
                if(idIndex == -1){//若未查找到，则添加
                    this.malfunctionIds.push(id);
                }else{//若已存在，则删除
                    this.malfunctionIds.splice(idIndex,1);
                }
                //console.log(this.malfunctionIds);

                //是否选中
                item.isSelect=!item.isSelect;

                //this.calculatePrice();
                this.resetPrice();
            },
            calculatePrice(){//计算价格，前端
                //筛选出所有选中项
                let selectedfaults = this.faults.filter(function (val) { return val.isSelect}),
                    totalPrice = 0,
                    discountedPrice = 0;
                //求和
                selectedfaults.forEach(selectItem=>{
                    //总价
                    totalPrice = this.$utils.accAdd(totalPrice,Number(selectItem.price));
                    //优惠价
                    discountedPrice = this.$utils.accAdd(discountedPrice,Number(selectItem.discountPrice));
                });
                //优惠了的价格
                let discount = this.$utils.Subtr(totalPrice,discountedPrice);
                this.handleData.amountDesc = isNaN(discountedPrice) ? '待检测' : `¥${discountedPrice}`;
                this.handleData.discountDesc = (isNaN(discount) ||  discount=='0') ? ' ' : `(会员折扣便宜${discount}元)`;
                this.handleData.amount = discountedPrice;
                this.handleData.discount = discount;
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
                if(!this.activeColor){
                    this.$toast('请选择手机颜色');
                    return;
                }
                this.$router.push({
                    name:'perfectInfo',
                    query:{
                        malfunctionIds:JSON.stringify(this.malfunctionIds),
                        brandModelId:this.brandModelId,
                        brandModelName:this.brandModelName,
                        phoneColor: this.activeColor,
                        handleData:JSON.stringify(this.handleData),
                        orderType:this.orderType
                    }
                })
            },
            resetData(){//重置/清空数据
                this.handleData= {
                    amountDesc: '¥0',//优惠后总价描述
                    discountDesc: '',//优惠了多少描述——(会员折扣便宜**元)
                    amount: 0,//优惠后总价
                    discount: 0,//优惠价——**
                    /*btnText: '下一步',
                    nextPath: '/perfectInfo'*/
                },
                    this.brandModelId='',//机型id，上一页面传入
                    this.brandModelName= '',//机型，上一页面传入
                    this.colorLists= [],
                    this.activeColor= '',//选中颜色
                    this.faults=[],//故障列表
                    this.malfunctionIds=[],//所有选中故障id，下单接口要用
                    this.orderType= '1',//1维修价格，2.内存升级价格,3保险价格
                    this.faultsClass={},//故障分类列表
                    this.activeFaultsClass= []//选中的所以故障类型
            }
        },
        created(){
            //防止页面刷新,vuex:store失效
            //在页面加载时读取localStorage里的状态信息
            if (localStorage.getItem("store") ) {
                this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))));
            }
        },
        activated(){
            //获取路由参数
            this.brandModelId = this.$route.query.brandModelId;
            this.brandModelName = this.$route.query.brandModelName;

            this.getColors(this.brandModelId);
            this.getPrice(this.brandModelId);
        },
        beforeRouteLeave(to, from, next){
            if(to.path=='/selectModel'){//返回selectModel页清空数据，下次进入该页面则无缓存；其他页返回该页面需缓存
                this.resetData();
            }
            next();
        }
    }
</script>

<style scoped>
    .order_options{
        width:100%;
        height: auto;
        background: #fff;
        margin-bottom:1.16rem;
    }
    .options_color .title{
        width: 7.5rem;
        height: 0.927rem;
        box-sizing: border-box;
        padding: 0 0.35rem;
        background: url(../../../assets/images/text_bg1.png) no-repeat;
        background-size: 100% 100%;
        line-height: 0.8rem;
        color: #fff;
        font-size: 0.24rem;
    }
    .options_color ul{
        width: 6.8rem;
        margin:0 auto;
        padding:0.15rem 0;
    }
    .options_color ul li{
        width: 1.84rem;
        height: 0.64rem;
        border: 0.02rem solid #d5d5d5;
        border-radius: 0.1rem;
        line-height: 0.64rem;
        text-align: center;
        font-size: 0.24rem;
        color: #686868;
        display: inline-block;
        margin:0.15rem 0.367rem 0.15rem 0;
    }
    .options_color ul li.active{
        border-color: #cf534a;
        color: #e24d46;
    }
    .options_fault{
        width: 7.5rem;
        background: #fff;
    }
    .options_fault ul{
        width: 6.8rem;
        margin:0 auto;
    }
    .options_fault .head{
        width: 100%;
        height: 0.88rem;
        border-bottom: 0.02rem solid #ececec;
        font-size: 0.25rem;
        color: #4b4b4b;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .options_fault ol{
        padding: 0.14rem 0;
    }
    .options_fault ol li{
        width: 100%;
        box-sizing: border-box;
        padding: 0 0.167rem;
        border: 0.02rem solid #979797;
        border-radius: 0.067rem;
        margin: 0.22rem 0;
    }
    .options_fault ol li.checked{
        border-color: #ce5249;
    }
    .options_fault .title{
        border-bottom: 0.02rem solid #ececec;
        height: 0.67rem;
        margin-top: 0.067rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .options_fault .desc{
        padding: 0.22rem 0;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
    }
    .options_fault h1{
        flex:1;
        font-size: 0.267rem;
        color: #3e3e3e;
    }
    .options_fault h1 small{
        font-size: 0.23rem;
    }
    .options_fault li.checked h1{
        color: #d05951;
    }
    .options_fault h2{
        width: 1.9rem;
        text-align: right;
        font-size: 0.24rem;
        color: #3e3e3e;
    }
    .options_fault h3{
        flex: 1;
        font-size: 0.22rem;
        color: #575757;
        font-weight: 500;
    }
    .options_fault h3 p{
        /*line-height: 0.27rem;*/
        line-height: 0.3rem;
    }
</style>