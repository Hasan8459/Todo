const express = require("express")
const { connection } = require("./config/db")
const { UserRouter } = require("./routes/userRoute")
const { PostRouter } = require("./routes/postRoute")
const dotenv = require("dotenv").config()
const cors = require("cors")


const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

app.use("/",UserRouter)
app.use("/",PostRouter)

app.get("/",(req,res)=>{
    res.send("Welcome final project")
})


app.listen(PORT,async()=>{
    try {
        await connection
        console.log(`server is running on port ${PORT} \n DB is also Connected`)
    } catch (error) {
        console.log(error.message)
    }
})