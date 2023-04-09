const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://trinhttk20411c:tun4eK0KBEnRlL4T@cluster0.amr5r35.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect();

// const collection = client.db("cosmetic").collection("product_list");


const express = require('express');
const app = express()
const port = 3004

const productRouter = require('./api/controllers/product.controller')
app.use('/api/products', productRouter)
app.listen(port, () => {
    console.log(`I am listening on port ${port}`)
})