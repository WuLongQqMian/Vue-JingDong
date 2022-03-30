<template>
  <div class="order">
    <div class="order__price">
      实付金额 <b>￥{{ calculations.price }}</b>
    </div>
    <div class="order__btn" @click="() => handleSubmitClick(true)">提交订单</div>
  </div>
  <div class="mask" v-show="showConfirm" @click="() => handleSubmitClick(false)">
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="() => handleConfirmOrder(true)"
        >
          取消订单
        </div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="() => handleConfirmOrder(false)"
        >
          确认支付
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { post } from '../../utils/request.js'
export default {
  name: 'Order',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const shopId = parseInt(route.params.id, 10)
    const store = useStore()
    const showConfirm = ref(false)
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
    const handleSubmitClick = (status) => {
      showConfirm.value = status
    }
    const handleConfirmOrder = async (isCanceled) => {
      const productList = cartList[shopId]?.productList || {}
      const notEmptyProductList = {}
      for (let i in productList) {
        const product = productList[i]
        if (product.count > 0) {
          notEmptyProductList[i] = product
        }
      }
      const shopName = cartList[shopId]?.shopName || ''
      const products = []
      for (let i in notEmptyProductList) {
        products.push({
          id: parseInt(notEmptyProductList[i]._id, 10),
          num: notEmptyProductList[i].count,
        })
      }
      try {
        const result = await post('/api/order', {
          addressId: 1,
          shopId,
          shopName,
          isCanceled: false,
          products,
        })
        if (result?.errno === 0) {
          store.commit('clearCartData', shopId)
          router.push({ name: 'OrderList' })
        }
      } catch (error) {}
    }
    return { calculations, handleConfirmOrder, showConfirm, handleSubmitClick }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 0.49rem;
  background: $bgColor;
  line-height: 0.49rem;
  &__price {
    flex: 1;
    text-indent: 0.24rem;
    font-size: 0.14rem;
    color: $content-fontColor;
  }
  &__btn {
    width: 0.98rem;
    background-color: #4fb0f9;
    text-align: center;
    font-size: 0.14rem;
    color: $bgColor;
  }
}
.mask {
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background-color: $bgColor;
    text-align: center;
    border-radius: 0.05rem;
    &__title {
      margin: 0.24rem 0 0 0.24rem;
      line-height: 0.26rem;
      font-size: 0.18rem;
      color: $content-fontColor;
    }
    &__desc {
      margin: 0.08rem 0 0 0;
      font-size: 0.14rem;
      color: $medium-fontColor;
    }
    &__btns {
      display: flex;
      margin: 0.24rem 0.58rem 0 0.58rem;
    }
    &__btn {
      flex: 1;
      width: 0.8rem;
      line-height: 0.32rem;
      font-size: 0.14rem;
      border-radius: 0.16rem;
      &--first {
        margin-right: 0.24rem;
        border: 0.01rem solid #4fb0f9;
        color: #4fb0f9;
      }
      &--last {
        background-color: #4fb0f9;
        color: $bgColor;
      }
    }
  }
}
</style>
