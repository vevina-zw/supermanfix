<template>
    <div class="content perfectInfo">
        <PageHeader headerTitle="信息填写" :isBorderBottom='false'></PageHeader>
        <div class="order_info">
<!--            <div class="order_way">
                <h1>维修方式</h1>
                <div class="way_box" @click="selectWay">
                    <div class="left" v-if="this.repairWay == 3"><img src="../../../assets/images/order_way_icon3.png">邮寄维修</div>
                    <div class="left" v-if="this.repairWay == 2"><img src="../../../assets/images/order_way_icon1.png">上门维修</div>
                    <div class="left" v-if="this.repairWay == 1"><img src="../../../assets/images/order_way_icon2.png">到店维修</div>

                    &lt;!&ndash;<img class="arrow_right" src="../../assets/images/icon_arrow_right.png">&ndash;&gt;
                    <span class="arrow">
                            <i class="fa fa-angle-right"></i>
                        </span>
                    </div>
            </div>-->
            <div class="order_way order_mode">
                <h1>维修方式</h1>
                <ul>
                    <li :class="{checked: this.repairWay == 2}" @click="selectRepairWay(2)"><img src="../../../assets/images/order_way_icon1-1.png">上门维修</li>
                    <li :class="{checked: this.repairWay == 1}" @click="selectRepairWay(1)"><img src="../../../assets/images/order_way_icon2-1.png">到店维修</li>
                    <li :class="{checked: this.repairWay == 3}" @click="selectRepairWay(3)"><img src="../../../assets/images/order_way_icon3-1.png">邮寄维修</li>
                </ul>
            </div>
            <div class="order_perfect">
                <ul>
                    <!--不同维修方式需要展示不同，看原型/设计稿-->
                    <li v-if="this.repairWay == 1">
                        <router-link to="/storeLists">
                            <span class="detail_info" v-if="storeInfo">{{storeInfo.storeName}}</span>
                            <span v-else>请选择门店</span>
                            <!--<img class="arrow_right" src="../../assets/images/icon_arrow_right.png">-->
                            <span class="arrow">
                                <i class="fa fa-angle-right"></i>
                            </span>
                        </router-link>
                    </li>
                     <li>
                        <router-link :to="{name:'myAddress',query:{fromPath:'perfectInfo'}}">
                            <span v-if="!addressInfo">请填写联系信息</span>
                            <span v-if="addressInfo" class="detail_info">{{addressInfo}}</span>
                            <!--<img class="arrow_right" src="../../assets/images/icon_arrow_right.png">-->
                            <span class="arrow">
                                <i class="fa fa-angle-right"></i>
                            </span>
                        </router-link>
                    </li>
<!--                    <li @click="openPicker()" v-if="this.repairWay != 3">
                        <span v-if="!datetimeValue">请选择预约时间</span>
                        <span v-else  class="detail_info">{{datetimeValue}}</span>
                        &lt;!&ndash;<img class="arrow_right" src="../../assets/images/icon_arrow_right.png">&ndash;&gt;
                        <span class="arrow">
                            <i class="fa fa-angle-right"></i>
                        </span>
                    </li>-->
                    <li @click="openDatetime()" v-if="this.repairWay != 3">
                        <span v-if="!appointmentTime">请选择预约时间</span>
                        <span v-else  class="detail_info">{{appointmentTime}}</span>
                        <!--<img class="arrow_right" src="../../assets/images/icon_arrow_right.png">-->
                        <span class="arrow">
                            <i class="fa fa-angle-right"></i>
                        </span>
                    </li>
                    <li v-if="validCouponNum>0">
                        <router-link :to="{name:'coupon',query:{fromPath:'perfectInfo'}}">
                            <span class="detail_info" v-if="couponInfo">{{couponInfo.couponName}}</span>
                            <span v-else>优惠劵<small>（有<em>{{validCouponNum}}</em>张可用）</small></span>
                            <!--<img class="arrow_right" src="../../assets/images/icon_arrow_right.png">-->
                            <span class="arrow">
                                <i class="fa fa-angle-right"></i>
                            </span>
                        </router-link>
                    </li>
                    <li @click="useVIPDiscount" v-if="Number(VIPDiscount)>0">
                        <span :class="{detail_info: isUseVIPDiscount}">会员{{VIPDiscount}}折优惠</span>
                    </li>
                    <!--以上，优惠券和会员折扣二选一-->
                    <li>
                        <textarea placeholder="备注（选填）" v-model="remarks" @blur.prevent="changeBlur"></textarea>
                    </li>
                </ul>
            </div>
            <div class="order_perfect">
                <ul>
                    <li>
                        <span>设备信息</span>
                        <span>{{brandModelName}}{{phoneColor}}</span>
                    </li>
                    <li v-for="(item,index) in selectedFaults" :key="index">
                        <span>{{item.malfunctionName}}</span>
                        <span><font v-if="!isNaN(item.price)">¥</font>{{item.price}}</span>
                    </li>
                </ul>
            </div>
            <div class="order_perfect order_mail" v-if="this.repairWay == 3">
                <h1>邮寄维修注意事项：</h1>
                <h2>感谢您的信任！我们的邮寄维修收货地址是：<font>浙江省杭州市拱墅区丰登路373-1号</font>，收件人：<font>超人修</font>，电话：<font>15267171850</font>.请使 用顺丰快递到付邮寄哦～</h2>
                <h2>我们收到您的设备后，会第一时间与您联系，请保持电话畅通！修复后邮寄回前需要您支付维修款：支付宝账号：<font>709604183@qq.com</font>（杭州小柏网络科技有限公司），请将付款成功的截图回复给我们，我们将在收到付款截图后安排邮寄！</h2>
            </div>
            <p class="order_warn">提交订单等同于同意<router-link to="/agreement">《维修服务条款》</router-link></p>
        </div>
        <!--<Handle :amountDesc="handleData.amountDesc" :discountDesc="handleData.discountDesc" :btnText="handleData.btnText" :nextPath="handleData.nextPath"></Handle>-->
        <Handle :amountDesc="handleData.amountDesc" :discountDesc="handleData.discountDesc">
            <!--<router-link class="next_btn" :to="{name:'perfectInfo'}">提交订单</router-link>-->
            <div class="next_btn" @click="placeOrder" v-if="!loading">提交订单</div>
            <div class="next_btn loading" v-else><span><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></span>提交中</div>
        </Handle>
        <!--<div class="lay_modal" v-show="layerShow">
            <div class="lay_modal_way">
                <h1>维修方式<i @click="closeLayer"></i></h1>
                <ul>
                    <li :class="{checked: this.repairWay == 3}" @click="selectRepairWay(3)">
                        <h1>
                            <span><img class="icon" src="../../../assets/images/order_way_icon3.png">邮寄维修</span>
                            &lt;!&ndash;<img class="check_btn" src="../../../assets/images/icon_checked.png">&ndash;&gt;
                            <i class="check_btn"></i>
                        </h1>
                        <h2>顺丰上门取件，费用由超人修承担</h2>
                    </li>
                    <li :class="{checked: this.repairWay == 2}" @click="selectRepairWay(2)">
                        <h1>
                            <span><img class="icon" src="../../../assets/images/order_way_icon1.png">上门维修</span>
                            &lt;!&ndash;<img class="check_btn" src="../../../assets/images/icon_checked.png">&ndash;&gt;
                            <i class="check_btn"></i>
                        </h1>
                        <h2>上门维修不收上门服务费</h2>
                    </li>
                    <li :class="{checked: this.repairWay == 1}" @click="selectRepairWay(1)">
                        <h1>
                            <span><img class="icon" src="../../../assets/images/order_way_icon2.png">到店维修</span>
                            &lt;!&ndash;<img class="check_btn" src="../../../assets/images/icon_checked.png">&ndash;&gt;
                            <i class="check_btn"></i>
                        </h1>
                        <h2>就近实体维修店，预约免排队</h2>
                    </li>
                </ul>
            </div>
        </div>-->

        <div class="lay_modal"  v-show="datetimeShow">
            <div class="lay_modal_way lay_modal_datetime">
                <h1><span @click="cancelDatetime">取消</span>期待维修时间<span @click="sureDatetime">确定</span></h1>
                <div class="datetime_list">
                    <h2>选择日期</h2>
                    <ol>
                        <li v-for="(item,index) in days" :key="index"
                            @click="chooseDatetime('date',item)"
                            :class="{checked: selectedDay == item}"
                        >{{item}}</li>
                    </ol>
                </div>
                <div class="datetime_list">
                    <h2>选择时间</h2>
                    <ol>
                        <li v-for="(item,index) in times" :key="index"
                            @click="chooseDatetime('time',item)"
                            :class="{checked: selectedTime == item}"
                        >{{item}}</li>
                    </ol>
                </div>
                <p>我们会根据下单的先后顺序以及预约的期望维修时间<br/>来安排维修，具体以联系为准。敬请谅解！</p>
            </div>
        </div>

        <!--<div class="datetimePicker">
            <mt-datetime-picker
                    ref="datetimePicker"
                    type="datetime"
                    year-format="{value}年"
                    month-format="{value}月"
                    date-format="{value}日"
                    hour-format="{value}时"
                    minute-format="{value}分"
                    @confirm="handleConfirm"
                    :startDate="startDate"
                    :startHour = "startHour"
                    :endHour = "endHour"
            >
            </mt-datetime-picker>
        </div>-->

    </div>
</template>

<script>
    import Vue from 'vue'
    import PageHeader from '../../../components/PageHeader'
    import Handle from '../../../components/Handle'
    export default {
        name: "PerfectInfo",
        components: {PageHeader, Handle},
        data(){
            return{
                handleData: {
                    amountDesc: '¥0',//优惠后总价
                    discountDesc: '',//优惠了多少——(会员折扣便宜**元)
                    /*btnText: '提交订单',
                    nextPath: '/perfectInfo'*/
                },

                malfunctionIds:[],//所有故障id，上一页面传入
                brandModelName:'',//机型，上一页面传入
                phoneColor: '',//手机颜色，上一页传入
                selectedFaults:[],//选中的故障列表，根据malfunctionIds筛选

                orderType: '',//1维修价格，2.内存升级价格,3保险价格。上一页传入

                storeInfo: null,//选中的门店

                couponInfo:null,//选中的优惠券

                isUseVIPDiscount: true,//是否使用会员优惠
                VIPDiscount: '',//会员折扣--比如88折等

                useDiscount: 1,//优惠使用——0都不使用;1使用会员优惠;2使用优惠券

                addressInfo: '',//展示的地址
                addressId: '',//地址id

                remarks: '',//备注

                repairWay:2,//维修方式：1到店维修,2上门服务,3邮寄

                // layerShow: false,

                datetimeValue:"",  //日期
                startHour: 9,
                endHour: 18,

                datetimeShow: false,//是否展示 自定义时间选择弹窗
                days: [],//存储后台接口返回的日期
                times: [],//存储后台接口返回的时间段
                selectedDay: '',//选中的日期
                selectedTime: '',//选中的时间
                appointmentTime: '',//选择的预约时间

                validCouponNum : 0,//可用优惠券张数

                loading: false,//是否提交中，false为可提交状态，true为提交中状态
            }
        },
        computed: {
            startDate(){
                return new Date();
            },
            userInfo(){
                return this.$store.getters.user
            }
        },
        methods: {
            getFault(id){//根据型号id 获取所有的故障及价格
                this.$axios.post("/api/brand/malPrice/"+id,{
                    phone: this.userInfo.phone,
                    token: localStorage.userToken,
                    type: this.orderType,//1维修价格，2.内存升级价格；保险价格
                }).then(res => {
                    console.log(res);
                    //let faults = res.data.data;

                     let faults = [];
                    let faultsClass = res.data.data;
                    //将所有的故障遍历出来，存到faults
                    for(let key in faultsClass){
                        let faultlist =  faultsClass[key].list;
                        faultlist.forEach((item)=>{
                            faults.push(item);
                        })
                    }
                    //筛选出malfunctionIds包含的项
                    this.selectedFaults = faults.filter(item=>{
                        return this.malfunctionIds.indexOf(item.malfunctionId) >=0;
                    });
                    //console.log(this.selectedFaults);
                })
            },
            getAddressList(){//获取地址列表=>获取=>默认地址
                this.$axios.post("/api/deliveryAddress/list",{
                    phone: this.userInfo.phone,
                    token: localStorage.userToken,
                }).then(res => {
                    console.log(res);
                    if(res.data.data.length > 0){
                        let addressJson = res.data.data.filter(item => {//获取默认地址
                            return item.defaultt;
                        });
                        if(addressJson.length > 0){
                            this.addressInfo = addressJson[0].wholeAddress + " " + addressJson[0].consignee + " " + addressJson[0].contactPhone;
                            this.addressId = addressJson[0].id;
                        }else{
                            this.addressInfo = '';
                            this.addressId = '';
                        }
                    }else{
                        this.addressInfo = '';
                        this.addressId = '';
                    }
                })
            },
            getCouponList(){//获取可用优惠券
                this.$axios.post("/api/coupon/list",{
                    phone: this.userInfo.phone,
                    token: localStorage.userToken,
                    couponStatus : 0,//状态:-2过期;-1无效;0待使用;1已使用; -1暂时不用(可空)
                }).then(res => {
                    console.log(res);
                    this.validCouponNum = res.data.data.length;
                })
            },
            placeOrder(){//提交订单
                let malfunctionIds = this.$utils.getStringByArr(this.malfunctionIds);
                console.log(malfunctionIds);
                let data = {//共有数据
                    phone: this.userInfo.phone,
                    token: localStorage.userToken,
                    maintainWay: this.repairWay,//维修方式:1到店维修,2上门服务,3邮寄
                    addressId: this.addressId,//收货地址id
                    memo: this.remarks,//备注
                    orderType: this.orderType,//订单类型:1维修;2内存升级;3保险
                    malfunctionIds,//故障id 用,隔开
                    couponIds: this.couponInfo ? this.couponInfo.customerCouponId : '',//优惠券
                    useDiscount: this.useDiscount,
                    color: this.phoneColor,//手机颜色
                    orderFrom: 1,// 订单来源:0 未知;1 H5;2 小程序;3 后台

                    //storeCode: this.storeInfo.storeCode,//门店编号
                    //appointmentTime: this.datetimeValue,//预约时间:YYYY-MM-DD HH:MM
                };
                let data1 = {//到店维修 独有
                    storeCode: this.storeInfo ? this.storeInfo.storeCode : '',//门店编号
                    // appointmentTime: this.datetimeValue ? this.datetimeValue : '',//预约时间:YYYY-MM-DD HH:MM
                    appointmentTime: this.appointmentTime ? this.appointmentTime : '',//预约时间
                };
                let data2 = {//上门服务 独有
                    storeCode: "",//门店编号，无设置为空
                    // appointmentTime: this.datetimeValue ? this.datetimeValue : '',//预约时间:YYYY-MM-DD HH:MM
                    appointmentTime: this.appointmentTime ? this.appointmentTime : '',//预约时间
                };
                let data3 = {//邮寄维修 独有
                    storeCode: "",//门店编号，无设置为空
                    appointmentTime: "",//预约时间:YYYY-MM-DD HH:MM:ss，无设置为空
                };


                let dataPost;
                if(this.repairWay == '1'){//到店维修
                    if(!data1.storeCode){
                        this.$toast('请选择门店');
                        return;
                    }else if(!data1.appointmentTime){
                        this.$toast('请选择预约时间');
                        return;
                    }
                    dataPost = Object.assign(data,data1)
                }else if(this.repairWay == '2'){//上门服务
                    if (!data1.appointmentTime){
                        this.$toast('请选择预约时间');
                        return;
                    }
                    dataPost = Object.assign(data,data2)
                }else{//邮寄维修
                    dataPost = Object.assign(data,data3);
                }

                console.log(dataPost);
                this.loading = true;
                this.$axios.post("/api/order/ordering",dataPost).then(res => {
                    console.log(res);
                    if(res.data.code == '1'){
                        this.$toast('订单提交成功');
                        this.$router.replace('/order');

                        //数据清除↓
                        this.resetData();
                    }
                    //改变按钮状态：正在提交→可提交
                    this.loading = false;
                }).catch(err => {
                    //改变按钮状态：正在提交→可提交
                    this.loading = false;
                })
            },
            resetData(){//重置/清空 部分数据
                if(this.couponInfo){
                    sessionStorage.removeItem('couponInfo');
                    this.couponInfo=null;
                }
                this.remarks  = '';
                this.appointmentTime = '';
                this.selectedDay = '';
                this.selectedTime = '';
            },
            resetPrice(){//计算价格
                let malfunctionIds = this.$utils.getStringByArr(this.malfunctionIds);
                this.$axios.post("/api/order/getOrderPrice",{
                    phone: this.userInfo.phone ? this.userInfo.phone : '',
                    token: localStorage.userToken ? localStorage.userToken : '',
                    couponIds: this.couponInfo? this.couponInfo.customerCouponId : '',//优惠券id(可为空)
                    malfunctionIds,//故障id(不能为空)
                }).then(res => {
                    console.log(res);
                    if(res.data.code == '1'){
                        this.VIPDiscount = res.data.data.customerDiscount;
                        if(res.data.data.priceCleared == 1){ //1价格确定;2价格未确定
                            if(this.useDiscount == 1){//使用会员折扣
                                console.log('计算使用会员折扣后价格');
                                this.handleData.amountDesc = `¥${res.data.data.dealAmount}`;
                                this.handleData.discountDesc = res.data.data.customerDiscountAmount=='0' ? ' ' : `(会员折扣便宜${res.data.data.customerDiscountAmount}元)`;
                            }else if(this.useDiscount == 2){//使用优惠券
                                console.log('计算使用优惠券后价格');
                                this.handleData.amountDesc = `¥${res.data.data.couponDiscountList[0].dealAmount}`;
                                this.handleData.discountDesc = res.data.data.couponDiscountList[0].couponDiscountAmount=='0' ? ' ' : `(优惠${res.data.data.couponDiscountList[0].couponDiscountAmount}元)`;
                            }else if(this.useDiscount == 0){//都未使用
                                console.log('计算未使用任何优惠的价格');
                                this.handleData.amountDesc = `¥${res.data.data.allOrignalAmount}`;
                                this.handleData.discountDesc = ' ';
                            }
                        }else if(res.data.data.priceCleared == 2){
                            this.handleData.amountDesc = '待检测';
                            this.handleData.discountDesc = ' ';
                        }
                    }else if(res.data.code == '-400' && res.data.msg=='优惠券已使用'){
                        //去除存储的优惠券信息
                        sessionStorage.removeItem('couponInfo');
                        this.couponInfo=null;
                    }
                })
            },
            useVIPDiscount(){//使用会员折扣，会员折扣和优惠券只能二选一
                if(!this.isUseVIPDiscount){
                    this.useDiscount = 1;
                }else{
                    this.useDiscount = 0;
                }
                sessionStorage.removeItem('couponInfo');
                this.couponInfo = '';
                this.isUseVIPDiscount = !this.isUseVIPDiscount;
                this.resetPrice();
            },
/*            selectWay(){
                this.layerShow = true;
            },*/
/*            closeLayer(){
                this.layerShow = false;
            },*/
            selectRepairWay(id){//选择维修方式
                this.repairWay = id;
                // this.layerShow = false;

                if(id!=3){//邮寄不需要选择日期
                    this.getDatetime();
                }
            },

/*            openPicker () {
                this.$refs.datetimePicker.open()
            },*/
/*            handleConfirm (data) {
                let year,month,date,hours,minutes;
                year = data.getFullYear();
                month = data.getMonth() + 1;
                date = data.getDate();
                hours = (data.getHours() <10) ? '0'+data.getHours() : data.getHours();
                minutes = (data.getMinutes() <10) ? '0'+data.getMinutes() : data.getMinutes();

                this.datetimeValue = year +'-'+ month +'-'+ date +' '+hours+':'+minutes;
            },*/
            getDatetime(){
                this.$axios.post("/api/order/appointmentTime/",{
                    maintainWay: this.repairWay//维修方式:1到店维修,2上门服务,邮寄
                }).then(res => {
                    console.log(res);
                    this.days = res.data.data.days;
                    this.times = res.data.data.timeZones;
                })
            },
            chooseDatetime(opt,item){
                if(opt == 'date'){
                    this.selectedDay = item;
                }else if(opt == 'time'){
                    this.selectedTime = item;
                }
            },
            openDatetime(){
                this.datetimeShow = true;
            },
            cancelDatetime(){
                this.selectedDay = '';
                this.selectedTime = '';
                this.datetimeShow = false;
            },
            sureDatetime(){
                if(this.selectedDay == ''){
                    this.$toast('请选择维修日期');
                    return
                }else if(this.selectedTime == ''){
                    this.$toast('请选择维修时间');
                    return
                }
                let selectedDay = this.selectedDay.trim().split(/\s+/)[1];
                this.appointmentTime = selectedDay + ' ' + this.selectedTime;
                console.log(this.appointmentTime);
                this.datetimeShow = false;
            },
            changeBlur(){
                this.$utils.changeBlur();
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
            /*
            引用keep-alive的时候，
            页面第一次进入，钩子的触发顺序created-> mounted-> activated，退出时触发deactivated。
            当再次进入（前进或者后退）时，只触发activated。
            （当组件在 <keep-alive> 内被切换，才会有activated 和 deactivated）
            */

            //获取路由参数
            if(this.$route.query.malfunctionIds){
                this.malfunctionIds = JSON.parse(this.$route.query.malfunctionIds);
            }
            this.brandModelId = this.$route.query.brandModelId;
            this.brandModelName = this.$route.query.brandModelName;
            this.phoneColor = this.$route.query.phoneColor;
            this.handleData = JSON.parse(this.$route.query.handleData);
            this.orderType = this.$route.query.orderType;

            if(sessionStorage.getItem('storeInfo')){
                this.storeInfo = JSON.parse(sessionStorage.getItem('storeInfo'));
            }

            if(sessionStorage.getItem('couponInfo')){//选择了优惠券
                this.couponInfo = JSON.parse(sessionStorage.getItem('couponInfo'));
                this.isUseVIPDiscount = false;
                this.useDiscount = 2;
                this.resetPrice();
            } else{
                if(this.useDiscount == 2){
                    //先选择了优惠券，又跳转到优惠券列表 去除选择的优惠券，然后返回到该页后，this.useDiscount仍然为2，则把this.useDiscount设为0
                    this.useDiscount = 0;
                }
                this.couponInfo = null;
            }

            if(this.malfunctionIds){
                this.getFault(this.brandModelId);
                this.resetPrice();
                this.getDatetime();
                this.getCouponList();
            }
            this.getAddressList();

        }
    }
</script>

<style scoped>
    .order_info{
        width:100%;
        height: auto;
        margin-bottom:1.5rem;
    }
    .order_way{
        width: 100%;
        box-sizing: border-box;
        padding:0 0.35rem;
        background: #fff;
        -moz-box-shadow:0px 5px 10px #F2F2F2;
        -webkit-box-shadow:0px 5px 10px #F2F2F2;
        box-shadow:0px 5px 10px #F2F2F2;
    }
    .order_way h1{
        font-size: 0.25rem;
        color: #9b9b9b;
        line-height: 0.59rem;
    }
    .way_box{
        width: 100%;
        height: 1.15rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .way_box .left{
        font-size: 0.28rem;
        color: #424242;
        font-weight: bold;
        display: flex;
        align-items: center;
    }
    .way_box .left img{
        width: 0.7rem;
        margin-right: 0.3rem;
    }
    .order_mode ul{
        display: flex;
        height: 1.4rem;
        align-items: center;
    }
    .order_mode ul li{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 0.24rem;
        color: #898989;
        font-weight: bold;
    }
    .order_mode ul li.checked{
        color: #424242;
    }
    .order_mode ul li img{
        width: 0.7rem;
        margin-bottom:0.12rem;
    }
    .order_perfect{
        background: #fff;
        margin: 0.21rem 0;
    }
    .order_perfect li{
        width: 6.8rem;
        margin:0 0.35rem;
        min-height: 0.98rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.247rem;
        color: #9b9b9b;
        font-weight: bold;
        border-bottom:0.02rem solid #ececec;
    }
    .order_perfect li:last-child{
        border-bottom:none;
    }
    .order_perfect li a{
        width: 6.8rem;
        min-height: 0.98rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #9b9b9b;
    }
    .order_perfect li a span small{
        /*font-size: 0.2rem;*/
        /*color: #484848;*/
    }
    .order_perfect li a span small em{
        color: #e55049;
        font-style: normal;
    }
    .order_perfect li textarea{
        font-size: 0.247rem;
        color: #484848;
        font-weight: bold;
        width: 100%;
        height: 1.67rem;
        box-sizing: border-box;
        padding: 0.3rem 0;
    }
    .order_perfect .detail_info{
        color: #484848;
    }
    .order_mail{
        width: 6.8rem;
        padding: 0.3rem;
    }
    .order_mail h1{
        color: #484848;
        font-size: 0.266rem;
        line-height: 0.5rem;
    }
    .order_mail h2{
        color: #635c5c;
        font-size: 0.233rem;
        line-height: 0.48rem;
    }
    .order_mail h2 font{
        color: #f25f56;
    }
    .order_warn{
        font-size: 0.186rem;
        color: #959595;
        text-align: center;
    }
    .order_warn a{
        color: #f0383a;
    }
    .lay_modal{
        width: 7.5rem;
        height: 100%;
        position: fixed;
        z-index: 9999;
        left: 50%;
        top: 0;
        margin-left: -3.75rem;
        background: rgba(0,0,0,0.6);
    }
    .lay_modal_way{
        width: 100%;
        box-sizing: border-box;
        padding: 0 0.35rem;
        position: absolute;
        left:0;
        bottom: 0;
        background: #fff;
        border-radius: 0.113rem;
    }
    .lay_modal_way >h1{
        height: 1.066rem;
        line-height: 1.066rem;
        text-align: center;
        font-size: 0.26rem;
        color: #484848;
        position: relative;
    }
    .lay_modal_way >h1 i{
        width: 0.226rem;
        height: 0.226rem;
        display: block;
        background: url("../../../assets/images/icon_fork.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        right:0;
        top: 0.42rem;
    }
    .lay_modal_way ul li{
        height: 1.35rem;
        border-bottom: 0.02rem solid #ececec;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        box-sizing: border-box;
        padding:0.1rem 0;
    }
    .lay_modal_way ul li h1{
        font-size: 0.247rem;
        color: #484848;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .lay_modal_way ul li h1 span{
        display: flex;
        align-items: center;
    }
    .lay_modal_way ul li h1 span img{
        width: 0.29rem;
        margin-right: 0.1rem;
    }
    .lay_modal_way ul li h2{
        font-size: 0.22rem;
        color: #949494;
    }
    .lay_modal_datetime{
        padding:0;
        border-radius: 0;
    }
    .lay_modal_datetime h1{
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 1px solid #f5f5f5;
        height: 0.8rem;
        line-height: 0.8rem;
    }
    .lay_modal_datetime h1 span{
        color: #4ab2ff;
    }
    .lay_modal_datetime .datetime_list{
        width: 100%;
        box-sizing: border-box;
        padding: 0 0.35rem;
        margin:0.1rem 0;
    }
    .lay_modal_datetime .datetime_list h2{
        font-size: 0.22rem;
        color: #484848;
        line-height: 0.5rem;
    }
    .lay_modal_datetime ol{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .lay_modal_datetime ol li{
        width: 30.33%;
        margin: 0.12rem 1.5%;
        font-size: 0.22rem;
        text-align: center;
        line-height: 0.6rem;
        color: #686868;
        border-radius: 0.04rem;
        box-sizing: border-box;
        /*background: #f5f5f5;*/
        border:0.02rem solid #d5d5d5;
    }
    .lay_modal_datetime ol li.checked{
        /*color: #484848;*/
        color: #e24d46;
        border-color: #cf534a;
        background: #fff;
    }
    .lay_modal_datetime >p{
        text-align: center;
        font-size: 0.2rem;
        color: #949494;
    }


    .perfectInfo >>> .picker-slot{
        font-size: 14px;
    }

    .handle_box .loading{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .handle_box .loading >span{
        font-size: 0.15rem;
        display: flex;
        align-items: center;
    }
</style>