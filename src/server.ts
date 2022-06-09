import express from 'express'
import cors from 'cors'
import { routes } from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

// Starting server on port:3333
app.listen(process.env.PORT || 3333, () => {
    console.log("\nHTTP Server running on port http://localhost:3333/")
})
