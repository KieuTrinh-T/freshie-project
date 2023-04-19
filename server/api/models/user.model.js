const { query } = require('express');
const { convertArrayResult, convertObjectResult, convertAuthenResult } = require('../../utils/function');
const User = require('../schema/user.schema');
let ObjectId = require('mongodb').ObjectId;

const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

const signUp = async(req) => {
    // Mongodb connection url
    const MONGODB_URI = "mongodb+srv://trinhttk20411c:tun4eK0KBEnRlL4T@cluster0.amr5r35.mongodb.net/?retryWrites=true&w=majority";

    // Connect to MongoDB
    mongoose.connect(MONGODB_URI, { dbName: 'cosmetic' });
    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    });


    let newUser = new User();

    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.phone = req.body.phone;
    newUser.setPassword(req.body.password);

    newUser.save()
        .then((result) => {
            console.log(result)
        })
        .catch((err) => {
            console.log(err)
        })
}

const signIn = async(req) => {

    // Mongodb connection url
    const MONGODB_URI = "mongodb+srv://trinhttk20411c:tun4eK0KBEnRlL4T@cluster0.amr5r35.mongodb.net/?retryWrites=true&w=majority";

    // Connect to MongoDB
    mongoose.connect(MONGODB_URI, { dbName: 'cosmetic' });
    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    });
    let result = {
        "is_auth": true,
        "message": "Authentication success."
    }

    User.findOne({ username: req.body.username }).then((user) => {
        if (!user) {
            result.message = "Authentication failed. User not found.";
            result.is_auth = false;
        }
        if (!user.validPassword(req.body.password)) {
            result.message = "Authentication failed. Wrong password.";
            result.is_auth = false;
        }
        console.log(result)
        return convertAuthenResult(result)
    });


}

const getUserById = async(req) => {
    try {
        const uri = "mongodb+srv://trinhttk20411c:tun4eK0KBEnRlL4T@cluster0.amr5r35.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        await client.connect();
        const collection = await client.db("cosmetic").collection("users");
        let query_id = new ObjectId(req.params.id)
        const result = await collection.findOne({ _id: query_id })
        await client.close()
        return convertObjectResult(result)
    } catch (err) {
        return err
    }
}
const filterUser = async(req) => {
    try {
        const uri = "mongodb+srv://trinhttk20411c:tun4eK0KBEnRlL4T@cluster0.amr5r35.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        await client.connect();
        const collection = await client.db("cosmetic").collection("users");
        let query = {}
        if (req.query.username) {
            query = {
                ...query,
                username: req.query.username
            }
        }
        if (req.query.email) {
            query = {
                ...query,
                email: req.query.email
            }
        }
        if (req.query.phone) {
            query = {
                ...query,
                phone: req.query.phone
            }
        }
        const result = await collection.find(query).toArray();
        await client.close()
        return convertArrayResult(result)
    } catch (err) {
        return err
    }
}


module.exports = {
    signUp,
    signIn,
    getUserById,
    filterUser
}