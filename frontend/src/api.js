import axios from 'axios'

const checkout = async (items) => {
  const result = await axios.post('/api/v1/cart/checkout', {cart: items})

  return result.data.data
}

export {
  checkout
}