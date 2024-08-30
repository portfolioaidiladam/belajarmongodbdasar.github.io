db.createCollection("customers");

db.createCollection("products");

db.createCollection("orders");
// untuk mendapatkan informasi data colectionnya apa aja
db.getCollectionNames();
// Mengambil semua document
db.customers.find()

// insert customers document
db.customers.insertOne({
    _id: "Aidil",
    name: "Aidil Adam"
})

// insert product documents
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
// insert order documents
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

// select * from customers  where _id = "aidil"
db.customers.find({
    _id: "aidil"
})
// select * from customers where name = " aidil adam"
db.customers.find({
    name: "Aidil Adam"
})
// select * from products where price = 2000
db.products.find({
    price: 2000
})
// select * from orders where items.products_id = 1
db.orders.find({
    "items.product_id": 1
})

// insert products documents
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

// select * from products where cateory exist (mengecek punya atribut atau tidak)
db.products.find({
    category: {
        $exists: true
    }
})

// select * from products where category is null
db.products.find({
    category: {
        $exists: false
    }
})
// select * from product where type (category) = 'string' (mengecek type dari atributnya)
db.products.find({
    category: {
        $type: "string"
    }
})
// select * from product where type (price) in ('int', 'long')
db.products.find({
    price: {
        $type: ['int', 'long']
    }
})

// insert customers documents
db.customers.insertOne({
    _id: 'joko',
    name: 'joko'
})

// select * from customers where_id = name
db.customers.find({
    $expr: {
        $eq: ['$_id', '$name']
    }
})

// select * from products where name is not null and category is not null
db.products.find({
    $jsonSchema: {
        required: ['name', 'category']
    }
})

//  select * from  products where name is not null and type (name) = 'string' and type (price) = 'number'
db.products.find({
    $jsonSchema: {
        required: ['name'],
        properties: {
            name: {
                type: 'string'
            },
            price: {
                type: 'number'
            }
        }
    }
})
// select * from products where price % 5 = 0
db.products.find({
    price: {
        $mod: [5, 0]
    }
})
// select *  from products where price % 1000000 = 0
db.products.find({
    price: {
        $mod: [1000000, 0]
    }
})

// select * from products where name like  "%mie%"
db.products.find({
    name: {
        $regex: /mie/,
        $options: 'i'
    }
})

// selectt * from products where name like  "Mie%"
db.products.find({
    name: {
        $regex: /^Mie/
    }
})

// select * from products where _id=name
db.customers.find({
    $where: function (){
        return this._id == this.name;
    }
})

// insert products with tags
db.products.insertMany([
    {
        _id: 6,
        name: "Logitech Wireless Mouse",
        price: new NumberLong("175000"),
        category: "laptop",
        tags: ["logitech", "mouse", "accessories"]
    },
    {
        _id: 7,
        name: "Cooler Pad Gaming",
        price: new NumberLong("200000"),
        category: "laptop",
        tags: ["cooler", "laptop", "accessories", "fan"]
    },
    {
        _id: 8,
        name: "Samsung Curve Monitor",
        price: new NumberLong("1750000"),
        category: "computer",
        tags: ["samsung", "monitor", "computer"]
    }
])
// select * from products where (tags =  "samsung" and tags = "monitor")
db.products.find({
    tags: {
        $all: ['samsung', 'monitor']
    }
})
// select * from products where tags in ("samsung", "logitect")
db.products.find({
    tags: {
        $elemMatch: {
            $in: ['samsung', 'logitech']
        }
    }
})
// select * from products where count (tags) = 3
db.products.find({
    tags: {
        $size: 4
    }
})
// belajar projection operator
// select _id, name , category from products
db.products.find({}, {
    name: 1,
    category: 1
})

// select _id, name, category, price from products
db.products.find({}, {
    tags: 0,
    price: 0
})
// select _id, name, tags [first] from products
db.products.find({}, {
    name: 1,
    tags: {
        $elemMatch: {
            $in: ['samsung', 'logitech', 'accessories']
        }
    }
})

// select _id , name, tags [first] from products where tags is not null
db.products.find({
    tags: {
        $exists: true
    }
}, {
    name: 1,
    "tags.$": 1
})

// select _id, name, category, price, tags[0-1] from products where tags is not null
db.products.find({
    tags: {
        $exists: true
    }
}, {
    name: 1,
    tags: {
        $slice: 2
    }
})
// belajar Query Modifier, membatasi jumlah data dengan paging
// select count (*) from products
db.products.find({}).count()
// select * from products limit 4
db.products.find({}).limit(4)
// select * from products offset 2 limit 4
db.products.find({}).skip(2).limit(4)
// select * from products order by category asc, name desc
db.products.find({}).sort({
    category: 1,
    name: -1
}).limit(4)


