const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'myproject';

let db = null;
exports.getClient = async () => {
    return new Promise((resolve) => {
        if (!db) {
            MongoClient.connect(url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                },
                function (err, client) {

                    assert.equal(null, err);
                    console.log("Connected successfully to server");
                    db = client.db(dbName);
                    resolve(db);

                });
        } else {
            resolve(db);
        }

    });
};
exports.close = () => {
    client.close();
}