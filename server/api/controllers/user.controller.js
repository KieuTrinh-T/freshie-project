'use strict'

const express = require('express')
const router = express.Router()
const { signUp, signIn, getUserById, filterUser } = require('../models/user.model')


router
    .post('/signup', async(req, res) => {
        const result = await signUp(req)
        res.status(200).json(result)
    })
    .post('/signin', async(req, res) => {
        const result = await signIn(req)
        res.status(200).json(result)

    })
    .get('/', async(req, res) => {
        const result = await filterUser(req)
        res.status(200).json(result)
    })
    .get('/:id', async(req, res) => {
        const result = await getUserById(req)
        res.send(result)
    })


module.exports = router