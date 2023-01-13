import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env['PORT'] || 3333

app.use(express.urlencoded({ extended: true })) /** Allow req.body */
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Henlo!!')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
