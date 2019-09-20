const db = require("../db");
const collectionName = "json";

exports.all = cb => {
  const collection = db.get().collection(collectionName);

  collection.find().toArray((err, docs) => {
    cb(err, docs);
  });
};

exports.recent = cb => {
  const collection = db.get().collection(collectionName);

  collection
    .find()
    .sort({ date: -1 })
    .limit(100)
    .toArray((err, docs) => {
      cb(err, docs);
    });
};

exports.create = (job, cb) => {
  const collection = db.get().collection(collectionName);

  collection
    .insert(insertOne);
};
