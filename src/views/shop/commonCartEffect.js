import { useStore } from 'vuex'
import { toRefs } from 'vue'

export const useCommonCartEffect = () => {
  const store = useStore()
  const { cartList } = toRefs(store.state)
  const changeCartItemToCart = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemToCart', { shopId, productId, productInfo, num })
  }
  return { cartList, changeCartItemToCart }
}
