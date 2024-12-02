import { MongoClient, Db, Collection } from 'mongodb'
import { collections } from './services'

export async function connectToDatabase() {
  const client: MongoClient = new MongoClient(process.env.DB_CONN_STRING ?? '')

  await client.connect()

  const db: Db = client.db(process.env.DB_NAME)

  const clientsCollection: Collection = db.collection(
    process.env.CLIENTS_COLLECTION_NAME ?? ''
  )

  collections.clients = clientsCollection

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${clientsCollection.collectionName}`
  )
}
