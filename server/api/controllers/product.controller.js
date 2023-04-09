'use strict'

const express = require('express')
const { getAllProducts, getProduct } = require('../models/product.model')
const router = express.Router()

router
    .get('/', async(req, res) => {

        const result = await getAllProducts(req)
        res.status(200).json(result)
    })
    .get('/:id', async(req, res) => {
        console.log(req.params.id)

        const result = await getProduct(req)
        res.status(200).json(result)
    })

module.exports = router