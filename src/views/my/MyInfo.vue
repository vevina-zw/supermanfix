<template>
    <div class="content myInfo">
        <PageHeader :headerTitle='headerTitle' :isBorderBottom='false' :isWhite='false'></PageHeader>
        <div class="myInfo_plate">
            <!--我的资料↓-->
            <ul v-if="formType == 'info'">
<!--                <li>
                    <span>头像</span>
                    &lt;!&ndash;<img @click="showSheet" class="info_head" src="../../assets/images/index_repair1.png">&ndash;&gt;

                    <div class="info_head" @click="showSheet">
                        <img src="../../assets/images/head_default.png">
                        &lt;!&ndash;<img class="arrow_right" src="../../assets/images/icon_arrow_right.png">&ndash;&gt;
                        <span class="arrow">
                            <i class="fa fa-angle-right"></i>
                        </span>
                    </div>
                </li>-->
                <li>
                    <span>头像</span>

                    <div class="info_head">
                        <form id="updateForm" class="img_box" method="post"  enctype="multipart/form-data">
                            <img v-if="headAvatar && headAvatar!='undefined'" :src="headAvatar">
                            <img v-else src="../../assets/images/head_default.png"><!--默认头像-->
                            <input type="file" name="file" accept="image/*" @change="addImg()" ref="imgFile"/>
                        </form>

                        <!--<img class="arrow_right" src="../../assets/images/icon_arrow_right.png">-->
                        <span class="arrow">
                            <i class="fa fa-angle-right"></i>
                        </span>
                    </div>
                </li>

                <li><span>用户名</span>{{userInfo.phone}}</li>
                <li><span>等级</span>V{{userInfo.level}}</li>
                <!--                <li>
                                    <span>性别</span>
                                    <div>男
                                        &lt;!&ndash;<img class="arrow_right" src="../../assets/images/icon_arrow_right.png">&ndash;&gt;
                                        <span class="arrow">
                                            <i class="fa fa-angle-right"></i>
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <span>生日</span>
                                    <div>1995-01-17
                                        &lt;!&ndash;<img class="arrow_right" src="../../assets/images/icon_arrow_right.png">&ndash;&gt;
                                        <span class="arrow">
                                            <i class="fa fa-angle-right"></i>
                                        </span>
                                    </div>
                                </li>-->
                <li>
                    <span>性别</span>
                    <div @click="sexVisible = true">{{sex}}
                        <!--<img class="arrow_right" src="../../assets/images/icon_arrow_right.png">-->
                        <span class="arrow">
                            <i class="fa fa-angle-right"></i>
                        </span>
                    </div>
                </li>
                <li>
                    <span>生日</span>
                    <div @click="openPicker">{{birthday}}
                        <!--<img class="arrow_right" src="../../assets/images/icon_arrow_right.png">-->
                        <span class="arrow">
                            <i class="fa fa-angle-right"></i>
                        </span>
                    </div>
                </li>
                <li @click="logout">
                    <span>退出登录</span>
                    <span class="arrow">
                        <i class="fa fa-angle-right"></i>
                     </span>
                </li>
            </ul>
            <!--我的资料↑-->

            <!--地址编辑↓-->
            <ul v-if="formType == 'address'">
                <li><input type="text" placeholder="请输入姓名" v-model="address_name" @blur.prevent="changeBlur"></li>
                <li><input type="text" placeholder="请输入手机号" v-model="address_phone" @blur.prevent="changeBlur"></li>
                <li>
                    <CityPicker @addressSelect="addressSelect" :addressJson="addressJson"></CityPicker>
                </li>
                <li class="autoHeight"><textarea placeholder="请输入详细地址" v-model="address_detail" @blur.prevent="changeBlur"></textarea></li>
            </ul>
            <div  v-if="formType == 'address'" class="default_box" @click="changeDefault" :class="{checked: defaultOrNot}"><i class="check_btn"></i>是否保存为默认地址</div>
            <!--地址编辑↑-->
        </div>

        <!--<a class="btn_all"><img src="../../assets/images/btn_save.png"></a>-->
        <!--保存个人信息-->
        <ButtonBox buttonName="保存" @buttonClick="saveInfo" v-if="formType == 'info'"></ButtonBox>
        <!--保存地址-->
        <ButtonBox buttonName="保存" @buttonClick="saveAddress" v-if="formType == 'address'"></ButtonBox>

        <!--年月日选择器-->
        <mt-datetime-picker
                type="date"
                ref="datePicker"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                @confirm="handleConfirm"
                :startDate="startDate"
        >
        </mt-datetime-picker>

        <!--性别选择器-->
        <mt-popup
                v-model="sexVisible"
                position="bottom">
            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
        </mt-popup>

        <!--头像上传方式选择-->
        <mt-actionsheet
                :actions="actions"
                v-model="sheetVisible">
        </mt-actionsheet>
    </div>
</template>

<script>
    import PageHeader from '../../components/PageHeader'
    import ButtonBox from '../../components/ButtonBox'
    import CityPicker from '../../components/CityPicker'

    export default {
        name: "MyInfo",
        components: {
            PageHeader,
            ButtonBox,
            CityPicker},
        data(){
            return{
                headerTitle: '编辑',

                formType: '',//表单展示类型——地址：address；个人信息：info
                addressJson: null,//CityPicker三级联动返回的数据
                address_name: '',
                address_phone: '',
                address_detail: '',//详细地址
                addressId: '',//编辑地址：地址id，新增地址无id
                defaultOrNot: false,//是否为默认地址

                birthday: "请选择",  //出生日期
                startDate: new Date('1968-01-01'),

                sexVisible: false,  //选择器的显示与影藏
                slots: [
                    {
                        flex: 1,
                        values: ['男','女'],
                        className: 'slot1',
                        textAlign: 'center'
                    }
                ],
                sex: "",

                actions: [
                    {name: '拍照', method : this.getCamera},
                    {name: '从相册中选择', method : this.getLibrary}
                ],//选择弹窗内容
                sheetVisible: false,//选择弹窗内容是否显示

                imgFile: '',//图片上传文件

                headAvatar:'',//头像前端展示：1.图片上传后后台返回的visitPath；2.原本就有头像的(vuex存储的avatar)
                headAvatar_abs: '',//图片上传后后台返回的absPath(无域名)，保存信息时给后台接口传该参数

                //token: localStorage.userToken
            }
        },
        computed: {
            userInfo(){
                return this.$store.getters.user
            }
        },
        methods: {
            saveAddress(){//保存地址
                let validatePhone_result = this.$utils.validatePhone(this.address_phone);
                if(!this.address_name){
                    this.$toast('请输入姓名');
                    return false;
                }else if(validatePhone_result != true){
                    this.$toast(validatePhone_result.phone);
                    return false;
                }else if(!this.addressJson){
                    this.$toast('请选择地区');
                    return false;
                }else if(!this.address_detail){
                    this.$toast('请输入详细地址');
                    return false;
                }

                this.$axios.post('/api/deliveryAddress/saveAddress',{
                    phone: this.userInfo.phone,
                    token: localStorage.userToken,
                    addressId : this.addressId ? this.addressId : "",//id 不为空-修改;为空-新增
                    provinceName : this.addressJson.province,//省
                    cityName : this.addressJson.city,//市
                    districtName : this.addressJson.area,//区/县
                    consignee : this.address_name,//收件人
                    contactPhone : this.address_phone,//收件人电话
                    detailAddress : this.address_detail,//详细地址
                    defaultt: this.defaultOrNot,//是否默认收货地址
                }).then(res => {
                    console.log(res);
                    if(res.data.code == '1'){//编辑成功
                        this.$router.go(-1);
                    }
                });
            },
            addressDetail(){//编辑地址时，查询地址信息渲染到页面
                this.$axios.post('/api/deliveryAddress/address',{
                    phone: this.userInfo.phone,
                    token: localStorage.userToken,
                    addressId : this.addressId,
                }).then(res => {
                    console.log(res);

                    this.addressJson = {
                        province: res.data.data.provinceName,
                        city: res.data.data.cityName,
                        area: res.data.data.districtName
                    };
                    this.address_name = res.data.data.consignee;//收件人
                    this.address_phone = res.data.data.contactPhone;//收件人电话
                    this.address_detail = res.data.data.detailAddress;//详细地址
                    this.defaultOrNot = res.data.data.defaultt;
                });
            },
            changeDefault(){
                this.defaultOrNot = !this.defaultOrNot;
            },
            addressSelect(data){
                this.addressJson = JSON.parse(data);
            },
            logout(){//退出登录
                this.$axios.post('/api/auth/logout',{
                    phone: this.userInfo.phone,
                    token: localStorage.userToken
                }).then(res => {
                    console.log(res);
                    if(res.data.code == "1"){
                        sessionStorage.clear();
                        localStorage.clear();
                        this.$store.dispatch('setUser',{});
                        // this.$router.push('login');
                        this.$router.push('home');
                    }
                });
            },
            initMyInfo(){
                if(this.userInfo.birthday){
                    this.birthday = this.userInfo.birthday
                }
                if(this.userInfo.sex){
                    this.sex = this.userInfo.sex==1 ? "男" :"女";
                }
                if(this.userInfo.avatar){
                    this.headAvatar = this.userInfo.avatar;
                }

            },
            saveInfo(){//编辑个人信息
                this.$axios.post("/api/my/modify",{
                    phone: this.userInfo.phone,
                    token: localStorage.userToken,
                    birthday: this.birthday,
                    sex: this.sex=="男" ? 1 : 2,//用户性别:1男;2女
                    avatar: this.headAvatar_abs? this.headAvatar_abs : '',
                    userName: this.userInfo.phone,
                }).then(res => {
                    console.log(res);
                    if(res.data.code == '1'){
                        if(this.sex){
                            this.userInfo.sex = this.sex=="男" ? 1 : 2;
                        }
                        if(this.headAvatar){
                            this.userInfo.avatar = this.headAvatar;
                        }
                        if(this.birthday){
                            this.userInfo.birthday = this.birthday;
                        }
                        this.$store.dispatch('setUser',this.userInfo);
                        //防止页面强行刷新,vuex:store失效，将store存入localStorage
                        localStorage.setItem("store",JSON.stringify(this.$store.state));

                        this.$toast('个人信息保存成功');
                        this.$router.go(-1);
                    }
                })
            },
            updateImg(){
                let fd= new FormData();
                let file = this.imgFile;
                console.log(this.imgFile);
                let bizType = 'avatar';//文件类型:avatar(头像);engMaintain(工程师维修)
                let phone= this.userInfo.phone;
                let token = localStorage.userToken;
                fd.append("file",file);
                fd.append("bizType",bizType);
                fd.append("phone",phone);
                fd.append("token",token);

                let config = {
                    //添加请求头
                    headers: { "Content-Type": "multipart/form-data"}
                };

                this.$axios.post('/api/file/upload',fd,config).then(res => {
                    console.log(res);
                    if(res.data.code =="1"){
                        this.headAvatar = res.data.data.visitPath;
                        this.headAvatar_abs = res.data.data.absPath;
                    }
                });
            },
            addImg(){//本地添加图片，预览
                //获取input file的files文件数组;
                //$('#filed')获取的是jQuery对象，.get(0)转为原生对象;
                //这边默认只能选一个，但是存放形式仍然是数组，所以取第一个元素使用[0];
                let file = this.$refs.imgFile.files[0];
                this.imgFile = file;
                //创建用来读取此文件的对象
                let reader = new FileReader();
                //使用该对象读取file文件
                reader.readAsDataURL(file);

                //读取文件成功后执行的方法函数——展示图片到前端
/*                reader.onload=function(e){
                    //读取成功后返回的一个参数e，整个的一个进度事件
                    console.log(e);
                    //选择所要显示图片的img，要赋值给img的src就是e中target下result里面
                    //的base64编码格式的地址
                    document.getElementById('imgshow').src = e.target.result;
                };*/

                this.updateImg();
            },
            openPicker () {
                this.$refs.datePicker.open()
            },
            handleConfirm (data) {
                let year,month,date;
                year = data.getFullYear();
                month = data.getMonth() + 1;
                date = data.getDate();
                this.birthday = year +'-'+ month +'-'+ date;
            },
            onValuesChange(picker, values) {
                //console.log(values)
                this.sex = values[0];
                this.sexVisible = false;
            },
            showSheet(){
                this.sheetVisible = true;
            },
            getCamera(){
                console.log('拍照')
            },
            getLibrary(){
                console.log('从相册中选择')
            },
            buttonClick(){
                console.log('点击保存')
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

            this.addressId = this.$route.query.addressId;
            if(this.addressId){
                this.addressDetail();
            }
        },
        mounted(){
            //编辑个人信息初始化
            this.initMyInfo();
        },
        beforeRouteEnter(to,from,next){
            if(from.path == '/myAddress'){
                next(vm => {
                    vm.headerTitle = '编辑地址';
                    vm.formType = 'address';
                })
            }else if(from.path == '/my'){
                next(vm => {
                    vm.headerTitle = '个人信息';
                    vm.formType = 'info'
                });
            }else{
                next();
            }
        }
    }
</script>

<style scoped>
    .myInfo{
        background: #f6f6f6;
    }
    .myInfo_plate{
        width: 6.8rem;
        /*background: #fff;*/
        margin: 0.12rem auto 0.4rem;
/*        border-radius: 0.1rem;
        -moz-box-shadow:0px 0px 10px #F1F1F1;
        -webkit-box-shadow:0px 0px 10px #F1F1F1;
        box-shadow:0px 0px 10px #F1F1F1;*/
    }
    .myInfo_plate ul{
        /*width: 6.8rem;*/
        background: #fff;
        /*margin: 0.12rem auto 0.4rem;*/
        border-radius: 0.1rem;
        -moz-box-shadow:0px 0px 10px #F1F1F1;
        -webkit-box-shadow:0px 0px 10px #F1F1F1;
        box-shadow:0px 0px 10px #F1F1F1;
    }
    .myInfo_plate li{
        width:100%;
        box-sizing: border-box;
        padding:0 0.33rem;
        height: 1.04rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.25rem;
        color: #4b4b4b;
        font-weight: normal;
        border-bottom: 0.02rem solid #f6f6f6;
    }
    .myInfo_plate li.autoHeight{
        height: auto;
    }
    .myInfo_plate .info_head{
        display: flex;
        align-items: center;
    }
    .myInfo_plate .info_head img{
        width: 0.65rem;
        height: 0.65rem;
        border-radius: 50%;
        overflow: hidden;
    }
    .myInfo_plate .info_head .img_box{
        width: 0.65rem;
        height: 0.65rem;
        overflow: hidden;
        position: relative;
    }
    .myInfo_plate .info_head .img_box input{
        width: 100%;
        height: 100%;
        position: absolute;
        left:0;
        top:0;
        z-index: 1;
        background: transparent;
        opacity:0;
    }
    .myInfo_plate input,.myInfo_plate textarea{
        font-size: 0.25rem;
        color: #4b4b4b;
        font-weight: normal;
    }
    .myInfo_plate input{
        width: 100%;
        height: 100%;
    }
    .myInfo_plate textarea{
        width: 100%;
        height: 1.67rem;
        box-sizing: border-box;
        padding: 0.3rem 0;
    }
    .mint-popup{
        width: 100%;
    }

    .button_box{
        width: 6.8rem;
    }

    .default_box{
        font-size: 0.24rem;
        color: #4b4b4b;
        font-weight: normal;
        line-height: 0.5rem;
        margin-top: 0.2rem;
    }
    .default_box .check_btn{
        margin-right: 0.2rem;
    }
</style>