import { Worker } from 'bullmq'
import IORedis from 'ioredis'

const connection = new IORedis({ maxRetriesPerRequest: null })

export function setupWorker() {
  new Worker(
    'welcome-user',
    async job => {
      console.log('Sending email to:', job.data.email)
      // call somet smtp or whater
    },
    { connection }
  )
}
