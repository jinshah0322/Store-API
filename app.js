require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const connectDB = require("./db/connect")
const {notFound, errorHandler} = require("./middlewares/errorHandler")
const products = require("./routes/products")

const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use("/api/v1/products",products)

app.use(notFound)
app.use(errorHandler)

const start = async()=>{
    await connectDB(process.env.MONGO_URL)
    app.listen(process.env.PORT,()=>{
        console.log(`Server started on port ${process.env.PORT}`);
    })
}

start()