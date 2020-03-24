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

// client.connect()
// .then(() => console.log("Connected successfully"))
// .then(() => client.query("select * from visitors"))
// .then( results => console.table(results.rows))
// .catch(e => console.log(e))
// .finally(() => client.end())

async function execute(){
  await client.connect()
  console.log("Connected successfully.")
  const results = await client.query("select * from visitors")
  console.table(results.rows)
  await client.end()
  console.log("Client disconnected successfully.")
}

async function addVisitor(id, name, age, date, time, assistedBy, comments) {
  try{
    await client.connect()
    await client.query("BEGIN")
    await client.query("insert into visitors values ($1, $2, $3, $4, $5, $6, $7)", [id, name, age, date, time, assistedBy, comments])
    console.log("Inserted a new row")
    await client.query("COMMIT")
  }
  catch(ex){
    console.log("Failed to add visitor " + ex)
  }
  finally{
    await client.end()
    console.log("script closed")
  }
}

// addVisitor(2, 'Lebo', 18, '03-24-2020', '20:00', 'Lentswe', 'I did not like Lentswe')
execute()