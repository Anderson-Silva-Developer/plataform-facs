var MongoClient = require('mongodb').MongoClient;
require("dotenv").config()

const MONGO_DB_URL_FACS =process.env.APP_URLFACS;

var DbConnection= function () {

    var db = null;
    var instance = 0;

    async function DbConnect() {
        try {
            
            let db_ = await MongoClient.connect(
                MONGO_DB_URL_FACS, {
                useNewUrlParser: true,                
                useUnifiedTopology: true
                                           
                
            })
                .then(
                    (conn) => conn.db(process.env.DB_NAME_FACS)                    
                    
                ).catch((err)=>console.log("Error db : "+err));

            return db_
        } catch (e) {
            return e;
        }
    }

   async function Get() {
        try {
            instance++;     // this is just to count how many times our singleton is called.
            console.log(`DbConnection called ${instance} times`);

            if (db != null) {
                console.log(`db connection is already alive`);            
                
                return db;
            } else {
                console.log(`getting new db connection`);
                db = await DbConnect();
                return db; 
            }
        } catch (e) {
            return e;
        }
    }

    return {
        Get: Get
    }
}

module.exports= DbConnection()