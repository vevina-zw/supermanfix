<template>
    <div class="text_group">
        <!--组件结构-->

        <div class="input_group">
            <!--组件容器-->
            <!--输入框-->
            <input
                    :type="type"
                    :value="value"
                    :placeholder="placeholder"
                    :name="name"
                    @input="$emit('input',$event.target.value)"
                    @focus="$emit('focus')"
                    @blur.prevent="changeBlur"
                    :class="{code_input: btnTitle}"
            >
            <!--按钮-->
            <button v-if="btnTitle" :disabled="disabled" @click="$emit('btnClick')">{{btnTitle}}</button>
        </div>
        <!--错误提示-->
        <div class="invalid-feedback" v-if="error">{{error}}</div>
    </div>
</template>

<script>
    export default {
        name: "inputGroup",
        props: {
            type: {
                type: String,
                default: Number
            },
            value: String,
            placeholder: String,
            name: String,
            btnTitle: String,
            disabled:Boolean,
            error:String
        },
        methods: {
            changeBlur(){
                this.$utils.changeBlur();
            }
        }
    }
</script>

<style scoped>
    .text_group{
        position: relative;
    }
    .input_group {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        margin-bottom: 0.28rem;
    }
    .input_group input {
        width: 100%;
        height: 0.82rem;
        box-sizing: border-box;
        padding: 0.1rem 0.28rem;
        line-height: 0.62rem;
        font-size: 0.25rem;
        background: #f8f8f8;
        border-radius: 0.067rem;
    }
    .input_group input.code_input{
        width: 67%;
    }
    .input_group button {
        width: 26%;
        height: 0.82rem;
        background: #f2f2f2;
        border-radius: 0.067rem;
        font-size: 0.23rem;
        color: #ec5c54;
        line-height: 0.82rem;
        text-align: center;
    }
    .input_group button[disabled] {
        color: #aaa;
    }
    .invalid-feedback {
        position: absolute;
        left:0;
        bottom: -0.25rem;
        font-size: 0.2rem;
        color: red;
        padding-top: 5px;
    }
</style>