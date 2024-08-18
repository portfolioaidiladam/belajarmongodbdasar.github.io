db.createCollection("customers");

db.createCollection("products");

db.createCollection("orders");
// untuk mendapatkan informasi data colectionnya apa aja
db.getCollectionNames();
// Mengambil semua document
db.customers.find()