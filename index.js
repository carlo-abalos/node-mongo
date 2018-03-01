const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, (err, client) => {

	assert.equal(err, null);

	console.log('Connected correctly to server');

	const db = client.db('conFusion');

	dboper.insertDocument(db, { name: "Carlo", description: "Test"},
		"dishes", (result) => {
			console.log("Insert Document:\n", result.ops);

			dboper.findDocuments(db, "dishes", (docs) => {
				console.log("Found Documents:\n", docs);

				dboper.updateDocument(db, {name: "Carlo"},
					{description: "Updated Test"}, "dishes",
					(result) => {
						console.log("Updated Document:\n", result.result);

						
					dboper.findDocuments(db, "dishes", (docs) => {
						console.log("Found Updated Documents:\n", docs);

						db.dropCollection("dishes", (result) => {
							console.log("Dropped Collection: ", result);

							client.close();
						});
					});
				});
			});
		});	

	/*const collection = db.collection('dishes');
	collection.insertOne({"name": "Carlo", "description": "test"},
		(err, result) => {
			assert.equal(err,null);

			console.log("After insert:\n");
			console.log(result.ops);

			collection.find({}).toArray((err,docs) => {
				assert.equal(err,null);

				console.log("Found:\n");
				console.log(docs);

				db.dropCollection('dishes', (err,result) => {
					assert.equal(err,null);

					client.close();
				});
			});
		});*/

});