'use strict'

const express = require('express')
const { getAllProducts, getProduct, getProductByCategory, getProductByBrand, filterProduct } = require('../models/product.model')
const router = express.Router()

router
    .get('/', async(req, res) => {
        const result = await filterProduct(req)
        res.status(200).json(result)
    })
    .get('/:id', async(req, res) => {
        console.log(req.params.id)
        const result = await getProduct(req)
        res.status(200).json(result)
    })
    .get('/categories/:category_id', async(req, res) => {
        const result = await getProductByCategory(req)
        res.status(200).json(result)
    })
    .get('/brands/:brand_id', async(req, res) => {
        const result = await getProductByBrand(req)
        res.status(200).json(result)
    })




module.exports = router