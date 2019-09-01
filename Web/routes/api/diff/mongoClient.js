import { MongoClient } from 'mongodb';;
import assert from 'assert';

const url = 'mongodb://localhost:27017';
const dbName = 'test';
let adminDb;

MongoClient.connect(url, function(err, client) {
  // Use the admin database for the operation
  const adminDb = client.db(dbName).admin();
  // List all the available databases
  adminDb.listDatabases(function(err, dbs) {
    assert.equal(null, err);
    assert.ok(dbs.databases.length > 0);
    client.close();
  });

  if( err ) {
      console.log('Custom error connecting', err)
  }
});

export default adminDb