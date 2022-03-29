<template>
  <div class="products">
    <div class="products__title">{{ shopName }}</div>
    <div class="products__wrapper">
      <div class="products__list">
        <template v-for="item in productList" :key="item._id">
          <div class="products__item" v-if="item.count > 0">
            <img class="products__item__img" :src="item.imgUrl" />
            <div class="products__item__detail">
              <h4 class="products__item__title">{{ item.name }}</h4>
              <p class="products__item__price">
                <span class="products__item__singleprice">
                  <span class="products__item__yen">￥</span>{{ item.price }} * {{ item.count }}
                </span>
                <span class="products__item__totalprice">
                  <span class="products__item__yen">￥</span
                  >{{ (item.price * item.count).toFixed(2) }}
                </span>
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'ProductList',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const store = useStore()
    const cartList = store.state.cartList
    const productList = computed(() => {
      const productList = cartList[shopId]?.productList || []
      return productList
    })
    const shopName = computed(() => {
      const shopName = cartList[shopId]?.shopName || ''
      return shopName
    })
    return {
      productList,
      shopName,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.products {
  margin: 0.16rem 0.18rem 0.1rem 0.18rem;
  background-color: $bgColor;
  &__title {
    padding: 0.16rem;
    font-size: 0.16rem;
    color: $content-fontColor;
  }
  &__wrapper {
    overflow-y: scroll;
    position: absolute;
    top: 2.5rem;
    right: 0;
    left: 0;
    bottom: 0.6rem;
    margin: 0 0.18rem;
  }
  &__list {
    background-color: $bgColor;
    padding-bottom: 0.16rem;
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.16rem 0.16rem 0 0.16rem;
    background-color: $bgColor;
    color: $content-fontColor;
    &__img {
      margin-right: 0.16rem;
      width: 0.46rem;
      height: 0.46rem;
    }
    &__detail {
      flex: 1;
    }
    &__title {
      @include ellipsis;
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
    }
    &__price {
      display: flex;
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $highlight-fontColor;
    }
    &__totalprice {
      flex: 1;
      text-align: right;
      color: $dark-fontColor;
    }
    &__yen {
      font-size: 0.12rem;
    }
  }
}
</style>
