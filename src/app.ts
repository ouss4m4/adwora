import express from 'express'
import path from 'path'
import routes from './routes'
import expressLayouts from 'express-ejs-layouts'
import { connectToDatabase } from './db/db'

const app = express()
const PORT = process.env.PORT

// VIEW ENGINE SETUP
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(expressLayouts)
app.set('layout', 'layout')

// PUBLIC FOLDER SERVING
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())

// BODY PARSERS
app.use(express.urlencoded({ extended: true }))
// Use routes
app.use(routes)

connectToDatabase()
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
