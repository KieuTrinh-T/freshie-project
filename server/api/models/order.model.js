const { convertArrayResult } = require('../../utils/function');

const { MongoClient, ServerApiVersion } = require('mongodb');

const mongoose = require('mongoose');

const getAllOrder = async(req) => {
    try {
        const uri = "mongodb+srv://trinhttk20411c:tun4eK0KBEnRlL4T@cluster0.amr5r35.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        await client.connect();
        const collection = await client.db("cosmetic").collection("order");
        const result = await collection.find({}).toArray();
        await client.close()
        return convertArrayResult(result)
    } catch (err) {
        return err
    }

}
const getOrderByUser = async(req) => {
    try {
        const uri = "mongodb+srv://trinhttk20411c:tun4eK0KBEnRlL4T@cluster0.amr5r35.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        await client.connect();
        const collection = await client.db("cosmetic").collection("order");
        const user_id = req.params.user_id
        const order_status_id = req.params.order_status_id
        const result = await collection.find({ user_id: user_id, order_status_id: order_status_id }).toArray();
        await client.close()
        return convertArrayResult(result)
    } catch (err) {
        return err
    }
}
const viewOrderItems = async(req) => {
    try {
        const uri = "mongodb+srv://trinhttk20411c:tun4eK0KBEnRlL4T@cluster0.amr5r35.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        await client.connect();
        const collection = await client.db("cosmetic").collection("order_item");
        const order_id = req.params.order_id
        const result = await collection.find({ order_id: order_id }).toArray();
        await client.close()
        return convertArrayResult(result)
    } catch (err) {
        return err
    }
}
const postOrder = async(req) => {
    // Mongodb connection url
    const MONGODB_URI = "mongodb+srv://trinhttk20411c:tun4eK0KBEnRlL4T@cluster0.amr5r35.mongodb.net/?retryWrites=true&w=majority";

    // Connect to MongoDB
    mongoose.connect(MONGODB_URI, { dbName: 'cosmetic' });
    mongoose.connection.on('connected', () => {
        console.log('Mess from function signIn: Connected to MongoDB');
    });


}
module.exports = {
    getAllOrder,
    getOrderByUser,
    viewOrderItems,
}