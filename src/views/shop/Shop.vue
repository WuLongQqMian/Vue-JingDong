<template>
  <div class="wrapper">
    <div class="search">
      <div class="iconfont search__back" @click="handleBackClick">&#xe6db;</div>
      <div class="search__content">
        <span class="iconfont search__content__icon">&#xe7b3;</span>
        <input class="search__content__input" type="text" placeholder="请输入商品名称搜索" />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl" />
    <Content :shopName="item.name" />
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request.js'
import ShopInfo from '../../components/ShopInfo'
import Content from './Content.vue'
import Cart from './Cart.vue'

const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get('/api/shop/' + route.params.id)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

const userBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

export default {
  name: 'Shop',
  components: {
    ShopInfo,
    Content,
    Cart,
  },
  setup() {
    const { item, getItemData } = useShopInfoEffect()
    const { handleBackClick } = userBackRouterEffect()
    getItemData()
    return { item, handleBackClick }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper {
  padding: 0 0.18rem;
}
.search {
  display: flex;
  margin: 0.16rem 0 0.04rem;
  line-height: 0.32rem;
  &__back {
    width: 0.3rem;
    font-size: 0.24rem;
    color: #b6b6b6;
  }
  &__content {
    display: flex;
    flex: 1;
    background-color: $search-bgColor;
    border-radius: 0.16rem;
    &__icon {
      width: 0.44rem;
      text-align: center;
      color: $search-fontColor;
    }
    &__input {
      display: block;
      padding-right: 0.2rem;
      width: 100%;
      border: none;
      outline: none;
      background: none;
      font-size: 0.14rem;
      color: $content-fontColor;
      &::placeholder {
        color: $content-fontColor;
      }
    }
  }
}
</style>
