<template>
  <div class="order">
    <div class="order__price">
      实付金额 <b>￥{{ calculations.price }}</b>
    </div>
    <div class="order__btn">提交订单</div>
  </div>
  <div class="mask">
    <div class="mask__content">
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div class="mask__content__btn mask__content__btn--first" @click="handleCancelOrder">
          取消订单
        </div>
        <div class="mask__content__btn mask__content__btn--last" @click="handleConfirmOrder">
          确认支付
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'Order',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
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
    const handleCancelOrder = () => {
      alert('cancel')
    }
    const handleConfirmOrder = () => {
      alert('confirm')
    }
    return { calculations, handleCancelOrder, handleConfirmOrder }
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
