import express from "express"
const app = express()
import freelancerRouter from "./routes/freelancer"
import workerRouter from "./routes/worker"
import cors from "cors"

app.use(express.json())
app.use(cors())

export const JWT_SECRET = "adarsh-secret"

app.use("/v1/freelancer",freelancerRouter)
app.use("/v1/worker",workerRouter)

const port = 3000

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})
