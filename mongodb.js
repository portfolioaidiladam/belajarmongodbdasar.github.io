db.createCollection("customers");

db.createCollection("products");

db.createCollection("orders");
// untuk mendapatkan informasi data colectionnya apa aja
db.getCollectionNames();
// Mengambil semua document
db.customers.find()

db.customers.insertOne({
    _id: "Aidil",
    name: "Aidil Adam"
})

db.products.insertMany([
    {
        _id: 1,
        name: "Indomie Ayam Bawang",
        price: new NumberLong("2000")
    },
    {
        _id: 2,
        name: "Mie Sedap Soto",
        price: new NumberLong("2000")
    }
])
// coba di copas ke clientnya jgn langsung semua kena error
// jadi harus setengah baris dulu baru lanjut
db.orders.insertOne({
    _id: new ObjectId(),
    total: new NumberLong("8000"),
    items: [
        {
            product_id: 1,
            price: new NumberLong("2000"),
            quantity: new NumberInt("2")
        },
        {
            product_id: 2,
            price: new NumberLong("2000"),
            quantity: new NumberInt("2")
        }
    ]
})

db.customers.find({
    _id: "aidil"
})

db.customers.find({
    name: "Aidil Adam"
})

db.products.find({
    price: 2000
})

db.orders.find({
    "items.product_id": 1
})

db.products.insertMany([
    {
        _id: 3,
        name: "Pop Mie Rasa Bakso",
        price: new NumberLong("2500"),
        category: "food"
    },
    {
        _id: 4,
        name: "Samsung Galaxy S9",
        price: new NumberLong("10000000"),
        category: "handphone"
    },
    {
        _id: 5,
        name: "Acer Predator XXI",
        price: new NumberLong("25000000"),
        category: "laptop"
    }
])
// select * from customers where _id = "aidil"
db.customers.find({
    _id: {
        $eq: "aidil"
    }
})
// select * from products where price > 2000
db.products.find({
    price: {
        $gt: 2000
    }
})
// select * from products where category in ('laptop','handphone') and price > 10000000
db.products.find({
    category: {
        $in: ["laptop", "handphone"]
    },
    price: {
        $gt: 10000000
    }
})

// select * from produts where category in ('laptop','handphone') and price > 10000000
db.products.find({
    $and: [
        {
            category: {
                $in: ["laptop", "handphone"]
            }
        },
        {
            price: {
                $gt: 10000000
            }
        }
    ]
})
// select * from products where category not in ('laptop','handphone')
db.products.find({
    category: {
        $not: {
            $in: ['laptop', 'handphone']
        }
    }
})