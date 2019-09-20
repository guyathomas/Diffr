import { MongoClient } from 'mongodb';
import assert from 'assert';

const url = 'mongodb://jobs-db';
const dbName = 'test';
let adminDb;

MongoClient.connect(url, function(err, client) {
  // Use the admin database for the operation
  const adminDb = client.db(dbName).admin();
  // List all the available databases
  adminDb.listDatabases(function(err, dbs) {
      if( err ) {
          console.log('Web: Custom error connecting', err)
      }
    assert.equal(null, err);
    assert.ok(dbs.databases.length > 0);
    client.close();
  });

});

export default adminDb