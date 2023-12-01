const connection=require("./db")
const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')

connection();
 
app.use(cors())

app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})