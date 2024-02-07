const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

initializeConnection = () => {
  /* create a connection object using createConnection function of mysql module*/
  var connection =  mysql.createConnection({
    host: dbConfig.HOST,
    database: dbConfig.DB,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    port: dbConfig.PORT
  }

  );
  connection.connect((err)=>{
    if(err){
      console.error(" Error connecting to the database");
      return;
    }
    console.log("connected to the database")
  })

  return connection;
}
module.exports = initializeConnection;