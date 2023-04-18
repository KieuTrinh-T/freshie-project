'use strict'

const express = require('express')
const { getAllOrder, viewOrderItems } = require('../models/order.model')
const router = express.Router()
router
    .get('/', async(req, res) => {
        const result = await getAllOrder(req)
        res.status(200).json(result)
    })
    .get('/:user_id/:order_status_id', async(req, res) => {
        const result = await getOrderByUser(req)
        res.status(200).json(result)
    })
    .get('/:order_id', async(req, res) => {
        const result = await viewOrderItems(req)
        res.status(200).json(result)
    })


module.exports = router