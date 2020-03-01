const axios = require('axios')
const currencyJs = require('currency.js')
const {CURRENCIES, CURRENCY_RUB} = require('../constants')

const
  URL = 'https://www.cbr-xml-daily.ru/daily_json.js',
  BASE_CURRENCY = CURRENCY_RUB

let
  rates = null,
  ratesPromise = null

class CurrenciesService {
  constructor() {
  }

  /**
   * @param fromAmount
   * @param fromCurrency
   * @param toCurrency
   * @returns {number}
   */
  convert(fromAmount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) {
      return fromAmount
    }

    return this
      .convertFromBaseCurrencyTo(
        this.convertToBaseCurrency(fromAmount, fromCurrency),
        toCurrency
      )
      .toJSON()
  }

  /**
   * @private
   * @param fromAmount
   * @param fromCurrency
   * @returns {currency}
   */
  convertToBaseCurrency(fromAmount, fromCurrency) {
    if (fromCurrency === BASE_CURRENCY) {
      return fromAmount
    } else {
      return currencyJs(fromAmount).multiply(rates[fromCurrency])
    }
  }

  /**
   * @private
   * @param amountInBaseCurrency
   * @param toCurrency
   * @returns {currency}
   */
  convertFromBaseCurrencyTo(amountInBaseCurrency, toCurrency) {
    if (toCurrency === BASE_CURRENCY) {
      return amountInBaseCurrency
    }

    return currencyJs(amountInBaseCurrency).divide(rates[toCurrency])
  }

  /**
   * @param fromAmount
   * @param fromCurrency
   * @param toCurrency
   * @returns {{}}
   */
  convertToAll(fromAmount, fromCurrency, toCurrency) {
    return toCurrency
      .map((currency) => {
        return {
          [currency]: this.convert(fromAmount, fromCurrency, currency)
        }
      })
      .reduce((acc, item) => ({...acc, ...item}), {})
  }

  /**
   * @returns {void}
   */
  async fetchRates() {
    if (rates) {
      return
    }

    if (ratesPromise) {
      return await ratesPromise
    }

    ratesPromise = axios.get(URL)

    const result = (await ratesPromise)['data']['Valute']

    rates = CURRENCIES
      .filter(currency => currency !== BASE_CURRENCY)
      .map(currency => {
        return {
          [currency]: result[currency]['Value']
        }
      })
      .reduce((acc, item) => ({...acc, ...item}), {})
  }
}

module.exports = CurrenciesService