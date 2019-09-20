import { MongoClient } from 'mongodb';

const state = {
  db: null,
}

export const connect = done => {
  if (state.db) return done()

  MongoClient.connect('mongodb://jobs-db', (err, db) => {
    if (err) return done(err)
    state.db = db
    done()
  })
}

export const get = () => {
  return state.db
}

export const close = done => {
  if (state.db) {
    state.db.close((err, result) => {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}