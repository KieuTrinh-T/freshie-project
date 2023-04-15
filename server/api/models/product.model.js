const { convertArrayResult } = require('../../utils/function');

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
        const result = await collection.findOne({ product_id: req.params.id })
        console.log(result)
        client.close()
        return result
    } catch (err) {
        return err
    }
}
const getProductByCategory = async(req) => {
    try {
        const uri = "mongodb+srv://trinhttk20411c:tun4eK0KBEnRlL4T@cluster0.amr5r35.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        await client.connect();
        const collection = await client.db("cosmetic").collection("product_list");
        const result = await collection.find({ category_id: req.params.category_id }).toArray()
        client.close()
        return result
    } catch (err) {
        return err
    }
}
const getProductByBrand = async(req) => {
    try {
        const uri = "mongodb+srv://trinhttk20411c:tun4eK0KBEnRlL4T@cluster0.amr5r35.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        await client.connect();
        const collection = await client.db("cosmetic").collection("product_list");
        const result = await collection.find({
            brand_id: req.params.brand_id
        }).toArray()
        console.log(result)
        client.close()
        return result
    } catch (err) {
        return err
    }
}

function search(query) {
    return function(element) {
        for (var i in query) {
            if (query[i] != element[i]) {
                return false;
            }
        }
        return true;
    }
}
const filterProduct = async(req) => {
    try {
        const uri = "mongodb+srv://trinhttk20411c:tun4eK0KBEnRlL4T@cluster0.amr5r35.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        await client.connect();
        const collection = await client.db("cosmetic").collection("product_list");
        let filter = req.query;
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        let sort = req.query.sort || "rating_average";
        if (req.query.min_price && req.query.max_price) {
            filter = {
                ...filter,
                price: {
                    $gte: parseInt(req.query.min_price),
                    $lte: parseInt(req.query.max_price)
                }
            }
        }
        if (req.query.min_price && !req.query.max_price) {
            filter = {
                ...filter,
                price: {
                    $gte: parseInt(req.query.min_price)
                }

            }
        }
        if (!req.query.min_price && req.query.max_price) {
            filter = {
                ...filter,
                price: {
                    $lte: parseInt(req.query.max_price)
                }
            }
        }

        if (req.query.min_rating) {
            console.log(req.query.min_rating)

            filter = {
                ...filter,
                rating_average: {
                    $gt: parseInt(req.query.min_rating)
                }
            }

        }
        if (req.query.sort_by) {
            if (req.query.sort_by == 'price_asc') {
                filter = {
                    ...filter,
                    price: 1
                }
            }
            if (req.query.sort_by == 'price_desc') {
                filter = {
                    ...filter,
                    price: -1
                }
            }

        }

        //sort
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc";
        }
        console.log(filter);
        ["sort", "page", "limit", "search", "min_price", "max_price", "min_rating"].forEach((e) => delete filter[e]);
        console.log(filter)
        const result = await collection.find(filter)
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit).toArray()
        client.close()
        return convertArrayResult(result)
    } catch (err) {
        return err
    }

}


module.exports = {
    getAllProducts,
    getProduct,
    getProductByCategory,
    getProductByBrand,
    filterProduct
}