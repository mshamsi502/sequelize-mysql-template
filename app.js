import express from "express"
import cors from "cors"
import busboy from "connect-busboy"
import { sequelize } from "./app/models/index.js"
import { route } from "./app/routes/myRoute.js"

const app = express()
app.use(busboy())

var corsOptions = {
  origin: "http://localhost:7000",
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

sequelize
  .sync()
  .then(() => {
    console.log("Synced db.")
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message)
  })

app.use("/", route)

// set port, listen for requests
const PORT = 7000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
