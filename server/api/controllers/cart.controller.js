'use strict'

const express = require('express')
const router = express.Router()
const { loadCart } = require('../models/cart.model')

router
    .get('/', async(req, res) => {
        res.status(200).json(await loadCart(req))
    })


module.exports = router