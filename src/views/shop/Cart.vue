<template>
  <div class="mask" v-if="showCart && calculations.total > 0" @click="handelCartShowChange"></div>
  <div class="cart">
    <div class="product" v-if="showCart && calculations.total > 0">
      <div class="product__header">
        <div class="product__header__all" @click="() => setCartItemsChecked(shopId)">
          <span
            class="product__header__icon iconfont"
            v-html="calculations.allChecked ? '&#xe652;' : '&#xe667;'"
          ></span>
          全选
        </div>
        <div class="product__header__clear" @click="() => cleanCartProducts(shopId)">
          清空购物车
        </div>
      </div>
      <template v-for="item in productList" :key="item._id">
        <div class="product__item" v-if="item.count > 0">
          <div
            class="product__item__checked iconfont"
            v-html="item.check ? '&#xe652;' : '&#xe667;'"
            @click="() => changeCartItemChecked(shopId, item._id)"
          ></div>
          <img class="product__item__img" :src="item.imgUrl" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ item.name }}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">￥</span>{{ item.price }}
              <span class="product__item__origin">￥{{ item.oldPrice }}</span>
            </p>
          </div>
          <div class="product__number">
            <span
              class="product__number__minus"
              @click="
                () => {
                  changeCartItemToCart(shopId, item._id, item, -1)
                }
              "
              >-</span
            >
            {{ item.count || 0 }}
            <span
              class="product__number__plus"
              @click="
                () => {
                  changeCartItemToCart(shopId, item._id, item, 1)
                }
              "
              >+</span
            >
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
          @click="handelCartShowChange"
        />
        <div class="check__icon__tag">{{ calculations.total }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">￥{{ calculations.price }}</span>
      </div>
      <div class="check__btn">
        <router-link :to="{ path: `/OrderConfirmation/${shopId}` }">去结算</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from './commonCartEffect.js'

const useCartEffect = (shopId) => {
  const { changeCartItemToCart } = useCommonCartEffect()
  const store = useStore()
  const cartList = store.state.cartList
  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList
    let result = { total: 0, price: 0, allChecked: true }
    if (productList) {
      for (let i in productList) {
        const product = productList[i]
        result.total += product.count
        if (product.check) {
          result.price += product.count * product.price
        }
        if (product.count > 0 && !product.check) {
          result.allChecked = false
        }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || []
    return productList
  })
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }
  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', { shopId })
  }
  return {
    calculations,
    productList,
    changeCartItemToCart,
    changeCartItemChecked,
    cleanCartProducts,
    setCartItemsChecked,
  }
}

const toggleCartEffect = () => {
  const showCart = ref(false)
  const handelCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handelCartShowChange }
}

export default {
  name: 'Cart',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const {
      calculations,
      productList,
      changeCartItemToCart,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked,
    } = useCartEffect(shopId)
    const { showCart, handelCartShowChange } = toggleCartEffect()
    return {
      shopId,
      calculations,
      productList,
      changeCartItemToCart,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked,
      showCart,
      handelCartShowChange,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: $bgColor;
  z-index: 2;
}
.product {
  overflow-y: scroll;
  flex: 1;
  background-color: $bgColor;
  &__header {
    display: flex;
    box-sizing: border-box;
    height: 0.52rem;
    border-bottom: 0.01rem solid $content-bgColor;
    line-height: 0.52rem;
    font-size: 0.14rem;
    color: $content-fontColor;
    &__all {
      margin-left: 0.18rem;
      margin-right: 1.8rem;
      width: 0.64rem;
    }
    &__icon {
      display: inline-block;
      margin-right: 0.1rem;
      vertical-align: top;
      color: $btn-bgColor;
      font-size: 0.2rem;
    }
    &__clear {
      flex: 1;
      padding-right: 0.16rem;
      text-align: right;
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;
    color: $content-fontColor;
    &__checked {
      margin-right: 0.2rem;
      line-height: 0.5rem;
      color: $btn-bgColor;
      font-size: 0.2rem;
    }
    &__detail {
      overflow: hidden;
    }
    &__img {
      margin-right: 0.16rem;
      width: 0.46rem;
      height: 0.46rem;
    }
    &__title {
      @include ellipsis;
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
    }
    &__price {
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $highlight-fontColor;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.3rem;
      font-size: 0.14rem;
      &__minus,
      &__plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.18rem;
        border-radius: 50%;
        font-size: 0.2rem;
        text-align: center;
      }
      &__minus {
        margin-right: 0.05rem;
        border: 0.01rem solid $medium-fontColor;
        color: $medium-fontColor;
      }
      &__plus {
        margin-left: 0.05rem;
        background: $btn-bgColor;
        color: $bgColor;
      }
    }
  }
}
.check {
  display: flex;
  box-sizing: border-box;
  height: 0.5rem;
  border-top: 0.01rem solid $content-bgColor;
  line-height: 0.5rem;
  &__icon {
    position: relative;
    width: 0.84rem;
    &__img {
      display: block;
      margin: 0.12rem auto;
      width: 0.28rem;
      height: 0.26rem;
    }
    &__tag {
      position: absolute;
      top: 0.03rem;
      left: 0.5rem;
      padding: 0 0.02rem;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      transform: scale(50%, 50%);
      transform-origin: left center;
      text-align: center;
      background-color: $highlight-fontColor;
      font-size: 0.16rem;
      color: $bgColor;
      border-radius: 0.1rem;
    }
  }
  &__info {
    flex: 1;
    color: $content-fontColor;
    &__price {
      font-size: 0.18rem;
      color: $highlight-fontColor;
    }
  }
  &__btn {
    width: 0.98rem;
    background-color: #4fb0f9;
    text-align: center;
    font-size: 0.14rem;
    a {
      color: $bgColor;
      text-decoration: none;
    }
  }
}
</style>
