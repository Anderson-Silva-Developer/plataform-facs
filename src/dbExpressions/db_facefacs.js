const { MongoClient } = require('mongodb');

// const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';
const MONGO_DB_URL = "mongodb+srv://AndersonSpider:legiao100@cluster0.a1x7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const DB_NAME = 'facefacs';

const connection = () => MongoClient
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = connection;              