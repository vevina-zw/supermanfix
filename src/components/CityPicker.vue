<template>
    <div class="cityPicker">
        <li>
            <div class="left">
                <span>请输入所在地区</span>
            </div>
<!--            <div class="right r">
                <div class="city" @click="toAddress">{{city}}</div>
                <i class="arrow-r"> </i>
            </div>-->
            <div  @click="toAddress">
                <font v-if="addressJson">{{addressJson.province + ' ' + addressJson.city + ' ' + addressJson.area}}</font>
                <font v-else>{{city}}</font>
                <!--{{city}}-->
                <span class="arrow">
                    <i class="fa fa-angle-right"></i>
                </span>
            </div>

        </li>
        <v-distpicker type="mobile"  @selected='selected' v-show="addInp">
        </v-distpicker>
        <div class="mask" v-show="mask"></div>
    </div>
</template>

<script>
    import VDistpicker from 'v-distpicker'
    export default {
        name: "CityPicker",
        components: { VDistpicker },
        props: {
            addressJson: Object
        },
        data(){
            return{
                //定义data数据
                city:'请选择',
                addInp :false,
                mask:false,
            }
        },
        methods: {
            // 点击弹出三级联动
            toAddress(){
                this.mask = true;
                this.addInp = true;
            },
            // 省市区三级联动
            selected(data){
                this.mask =false;
                this.addInp = false;
                this.city = data.province.value + ' ' + data.city.value +' ' + data.area.value;
                let addressJson = {
                    province: data.province.value,
                    city: data.city.value,
                    area: data.area.value
                };
                this.$emit('addressSelect',JSON.stringify(addressJson));
            },
        }
    }
</script>

<style scoped>
    .mask{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 998;
    }
    .cityPicker,.cityPicker li{
        width: 100%;
        height: 100%;
    }
    .cityPicker li{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>