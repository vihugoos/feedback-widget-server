import express from 'express'
import cors from 'cors'
import { routes } from './routes'

const app = express()
const port = process.env.PORT || 3333

app.use(cors())
app.use(express.json({limit: '15mb'}))
app.use(routes)

app.listen(port, () => {
    console.log(`\nHTTP Server running on port http://localhost:${port}/`)
})
