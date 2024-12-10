import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import routes from './routes'
import expressLayouts from 'express-ejs-layouts'
import { connectToDatabase } from './db/db'
import methodOverride from 'method-override'
import { setupWorker } from './Queue/email.worker'
import { Queue } from 'bullmq'
import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { ExpressAdapter } from '@bull-board/express'
import emailQueue from './Queue/email.q'

const app = express()
const PORT = process.env.PORT

const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath('/ui')

app.use('/ui', serverAdapter.getRouter())

// VIEW ENGINE SETUP
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(expressLayouts)
app.set('layout', 'layout')

// PUBLIC FOLDER SERVING
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())

// BODY PARSERS
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// Use routes

connectToDatabase()

//start bullmq and board
setupWorker()

createBullBoard({
  queues: [new BullMQAdapter(emailQueue)],
  serverAdapter,
})

app.use(routes)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
