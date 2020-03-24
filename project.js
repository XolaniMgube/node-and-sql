// npm install --save pg
// find out more here: https://node-postgres.com/

// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "user",
//   host: "localhost",
//   database: "db",
//   password: "pass",
//   port: 5432
// });

// const helloWorld = () => {
//   pool.query(
//     "SELECT $1::text as message",
//     ["Hello world!"],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }

//       console.log(results.rows);
//     }
//   );
// };

// helloWorld();

const {Client} = require('pg')
const client = new Client({
  user: "user",
  password: "pass",
  host: "localhost",
  port: "5432",
  database: "db"
})

client.connect()
.then(() => console.log("Connected successfully"))
.then(() => client.query("select * from visitors"))
.then( results => console.table(results.rows))
.catch(e => console.log(e))
.finally(() => client.end())