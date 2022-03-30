<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order">
        <div class="order__title">
          沃尔玛
          <span class="order__status">已取消</span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <img class="order__content__img" src="" alt="" />
            <img class="order__content__img" src="" alt="" />
            <img class="order__content__img" src="" alt="" />
            <img class="order__content__img" src="" alt="" />
          </div>
          <div class="order__info">
            <div class="order__info__price">￥36.88</div>
            <div class="order__info__count">共2件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import Docker from '../../components/Docker.vue'
export default {
  components: { Docker },
  name: 'OrderList',
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  background-color: $content-bgColor;
}
.title {
  line-height: 0.44rem;
  background-color: $bgColor;
  text-align: center;
  color: $content-fontColor;
  font-size: 0.16rem;
}
.orders {
}
.order {
  margin: 0.16rem 0.18rem;
  padding: 0.16rem;
  background-color: $bgColor;
  &__title {
    font-size: 0.16rem;
    color: $content-fontColor;
  }
}
</style>
