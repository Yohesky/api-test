const express = require("express")
require("dotenv").config()
const cors = require("cors")
const { dbConnection } = require("./db/config")


//create server
const app = express()

// cors

app.use(cors())

// read body

app.use(express.json())

// database
dbConnection()

// routes

app.use("/api", require("./routes/employee"))


app.listen( process.env.PORT || 8000, () => {
    console.log("server running at", process.env.PORT || 8000)   
})