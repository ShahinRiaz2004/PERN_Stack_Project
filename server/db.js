const Pool  = require("pg").Pool;



const pool = new Pool({

    user: "postgres",
    password: "1234",
    host: "localhost"  ,
    port:  5432 ,
    database:  "perntodo"
});

pool.
connect()
.then((client) => {
    console.log("✅ PostgreSQL Connected Successfully");
    client.release();
})
.catch((err)  => {
    console.error("❌ PostgreSQL Connection Error:", err.message);
    
})

module.exports = pool;