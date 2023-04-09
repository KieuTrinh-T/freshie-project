const { MongoClient, ServerApiVersion } = require('mongodb');

const getAllProducts = async(req) => {
    try {
        const uri = "mongodb+srv://trinhttk20411c:tun4eK0KBEnRlL4T@cluster0.amr5r35.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        await client.connect();
        const collection = await client.db("cosmetic").collection("product_list");
        const result = await collection.find({}).toArray();
        await client.close()
        return result
    } catch (err) {
        return err
    }

}
const getProduct = async(req) => {
    try {
        const uri = "mongodb+srv://trinhttk20411c:tun4eK0KBEnRlL4T@cluster0.amr5r35.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        await client.connect();
        const collection = await client.db("cosmetic").collection("product_list");
        const result = await collection.findOne({ _id: "64323a4e17378273d8a7655e" });
        console.log(result)
        await client.close()
        return result
    } catch (err) {
        return err
    }
}

module.exports = {
    getAllProducts,
    getProduct
}