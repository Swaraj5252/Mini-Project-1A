// express configuration
const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")

// bringing in all routes
const userRoute = require("./Routes/UserRoutes")
const blogRoute = require("./Routes/BlogRoutes")
// const authRoute = require("./Routes/AuthRoute")
// const productRoute = require("./Routes/ProductRoute")
// const orderRoute = require("./Routes/OrderRoute")
// json configuration
app.use(express.json())

// ------------------------------------------------------------------------------------ //
// dotenv config
dotenv.config()

mongoose.connect(process.env.MONOGO_URL)
.then(() => console.log("DB connected sucessfully......"))
.catch((err) => console.log(err))
// using inbuilt json middleware
app.use(express.json())

app.use("/api/users", userRoute)
app.use("/api/blogs", blogRoute)

const port = process.env.PORT || 1232

app.listen(port, () => {
    console.log(`server started on port ${port}........`);
})