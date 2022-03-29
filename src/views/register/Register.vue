<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" />
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="text"
        placeholder="请输入用户名"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        placeholder="请输入密码"
        autocomplete="new-password"
        v-model="password"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        placeholder="确认密码"
        v-model="ensurement"
      />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleLoginClick">已有帐号去登录</div>
  </div>
  <Toast v-if="show" :message="toastMessage" />
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request.js'
import Toast, { useToastEffect } from '../../components/Toast.vue'

const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: '',
    ensurement: '',
  })
  const handleRegister = async () => {
    try {
      if (data.username === '' || data.password === '' || data.ensurement === '') {
        showToast('用户名密码不能为空')
      } else {
        const result = await post('/api/user/register', {
          username: data.username,
          password: data.password,
        })
        if (result?.errno === 0) {
          router.push({ name: 'Login' })
        } else {
          showToast('注册失败')
        }
      }
    } catch (error) {
      showToast('请求失败')
    }
  }
  const { username, password, ensurement } = toRefs(data)
  return { username, password, ensurement, handleRegister }
}

const useLoginEffect = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({ name: 'Login' })
  }
  return { handleLoginClick }
}

export default {
  name: 'Register',
  components: {
    Toast,
  },
  setup() {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, ensurement, handleRegister } = useRegisterEffect(showToast)
    const { handleLoginClick } = useLoginEffect()
    return { username, password, ensurement, show, toastMessage, handleRegister, handleLoginClick }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem;
    width: 0.66rem;
    height: 0.66rem;
  }
  &__input {
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem;
    &__content {
      box-sizing: border-box;
      padding: 0 0.16rem;
      background: #f9f9f9;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 0.06rem;
      border-radius: 0.06rem;
      line-height: 0.48rem;
      width: 100%;
      font-size: 0.16rem;
      color: $content-notice-fontColor;
      &::placeholder {
        color: $content-notice-fontColor;
      }
    }
  }
  &__register-button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    height: 0.48rem;
    width: 2.95rem;
    line-height: 0.48rem;
    background: $btn-bgColor;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    font-size: 0.16rem;
    color: $bgColor;
    text-align: center;
  }
  &__register-link {
    text-align: center;
    font-size: 0.14rem;
    color: $content-notice-fontColor;
  }
}
</style>
