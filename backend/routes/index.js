const express = require('express')
const {check, validationResult} = require('express-validator')
const CurrenciesService = require('../services/CurrenciesService')
const CartService = require('../services/CartService')
const {CURRENCIES} = require('../constants')

module.exports = () => {
  const router = express.Router()

  const middleWares = [
    express.json(),
    check('cart.*.name').isString(),
    check('cart.*.price').isFloat({gt: 0}),
    check('cart.*.quantity').isInt({gt: 0}),
    check('cart.*.currency').isIn(CURRENCIES)
  ]

  router.post('/api/v1/cart/checkout', middleWares, async (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()})
    }

    try {
      // TODO DI
      const
        currenciesService = new CurrenciesService(),
        cart = new CartService(currenciesService)

      await currenciesService.fetchRates()

      res.json({
        data: cart.checkout(req.body.cart)
      })

    } catch (e) {
      next(e)
    }
  })

  return router
}

