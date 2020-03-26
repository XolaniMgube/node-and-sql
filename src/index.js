
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

async function addVisitor(name, age, date, time, assistedBy, comments) {
  try{
    await client.connect()
    await client.query("BEGIN")
    await client.query("insert into visitors (visitorname, visitorage, dateofvisit, timeofvisit, assistedby, comments) values ($1, $2, $3, $4, $5, $6)", [name, age, date, time, assistedBy, comments])
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

async function deleteVisit(id) {
  try {
    await client.connect()
    await client.query("BEGIN")
    await client.query("delete from visitors where id=$1", [id])
    console.log("visitor deleted")
    await client.query("COMMIT")
      
  }
  catch(ex){
    console.log("Failed to delete visitor " + ex)
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

async function updateVisitor(name, age, date, time, assistedBy, comments, idToBeUpdated) {
  try{
    await client.connect()
    await client.query("BEGIN")
    await client.query("update visitors set visitorname = $1, visitorage = $2, dateofvisit = $3, timeofvisit = $4, assistedby = $5, comments = $6 where id = $7", [name, age, date, time, assistedBy, comments, idToBeUpdated])
    console.log("visitor updated")
    await client.query("COMMIT")
  }
  catch(ex){
    console.log("Failed to update visitor" + ex)
  }
  finally{
    await client.end()
    console.log("script closed")
  }
}

async function viewOneVisitor(id) {
  try{
    await client.connect()
    await client.query("BEGIN")
    const results = await client.query("select * from visitors where id = $1", [id])
    console.table(results.rows)
    await client.query("COMMIT")
  }
  catch(ex) {
    console.log("Failed to view visitor" + ex)
  }
  finally{
    await client.end()
    console.log("script closed")
  }
}




// addVisitor('Xolani', 26, '03-24-2020', '20:00', 'Stuber', 'Ping pong guru after me')
// viewTable()
// deleteAllVisitors()
// updateVisitor('Xolani', '30', '03-24-2020', '20:00', 'Kurtlin', 'final test in comments', 4)
// deleteVisit(1)
viewOneVisitor(3)
