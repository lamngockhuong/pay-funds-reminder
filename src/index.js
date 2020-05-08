import express from 'express'
import cron from 'node-cron'
import { remind } from './services/reminderService'
import moment from 'moment'

const app = express()

// // schedule tasks to be run on the server
// cron.schedule('* * * * *', function() {
//   console.log('running a task every minute')
// })

const now = moment()
const month = now.month() + 1
const year = now.year()

let sheetName = `Tháng ${month - 1}/${year}`

remind(sheetName)

app.listen(3128)
