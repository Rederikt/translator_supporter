const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const multer = require("multer")
const upload = multer({ dest: "uploads/" })

// Routes
const orderRoute = require("./routes/order")
const ordersRoute = require("./routes/orders")
const authRoute = require("./routes/auth")

dotenv.config()

const port = 4000

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("connected to db")
)

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes middlewares

app.use("/api/user", authRoute)
app.use("/api/order", orderRoute)
app.use("/api/orders", ordersRoute)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
