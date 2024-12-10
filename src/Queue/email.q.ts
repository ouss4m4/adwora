import { Queue } from 'bullmq'

export const emailQueue = new Queue('welcome-user', {
  connection: {
    host: 'localhost',
    port: 6379,
  },
})

export async function addWelcomeNewUserJob(email: string) {
  await emailQueue.add('welcome-user', { email })
}

export default emailQueue
