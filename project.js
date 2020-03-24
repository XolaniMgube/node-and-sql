
const {Client} = require('pg')
const client = new Client({
  user: "user",
  password: "pass",
  host: "localhost",
  port: "5432",
  database: "db"
})


async function viewTable(){
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

async function deleteAllVisitors() {
  try{
    await client.connect()
    await client.query("BEGIN")
    await client.query("delete from visitors")
    console.log("Deleted all visitors")
    await client.query("COMMIT")
  }
  catch(ex){
    console.log("Failed to delete visitors" + ex)
  }
  finally{
    await client.end()
    console.log("script closed")
  }
}

// addVisitor(1, 'Xolani', 25, '03-24-2020', '20:00', 'Kurtlin', 'He was drinking lean the whole time')
// addVisitor(2, 'Lebo', 18, '03-24-2020', '20:00', 'Lentswe', 'I did not like Lentswe')
viewTable()
// deleteAllVisitors()
// viewTable()
