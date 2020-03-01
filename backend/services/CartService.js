const currencyJs = require('currency.js')
const {CURRENCIES, CURRENCY_RUB} = require('../constants')

/**
 * @property {CurrenciesService} currenciesService
 */
class CartService {
  constructor(currenciesService) {
    this.currenciesService = currenciesService
  }

  /**
   * @param cartItems
   * @returns {{}}
   */
  checkout(cartItems) {
    const
      baseCurrency = CURRENCY_RUB,
      totalInBaseCurrency = this.calculateSum(cartItems, baseCurrency)

    return this.currenciesService.convertToAll(totalInBaseCurrency, baseCurrency, CURRENCIES)
  }

  /**
   * @private
   * @param cartItems
   * @param outCurrency
   * @returns {number}
   */
  calculateSum(cartItems, outCurrency) {
    const reducer = (acc, item) => currencyJs(acc).add(item)

    const sum = cartItems
      .map(({price, quantity, currency}) => {
        const priceInBaseCurrency = this.currenciesService.convert(price, currency, outCurrency)
        return currencyJs(priceInBaseCurrency).multiply(quantity)
      })
      .reduce(reducer, 0)

    return currencyJs(sum).toJSON()
  }
}

module.exports = CartService