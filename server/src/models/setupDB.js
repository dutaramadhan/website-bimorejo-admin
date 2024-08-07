const mongoose = require('mongoose');

const setupDB  = () => {
  const dbUrl = process.env.DB_URL;
  mongoose.connect(dbUrl);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function(){
      console.log('Connected to MongoDB');
  });
  return db;
}

module.exports = setupDB;