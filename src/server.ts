import app from './app'
import config from './app/config'
import mongoose from 'mongoose'

async function main() {
  // Connect to database
  await mongoose.connect(config.db_url as string)

  // Start server
  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
  })
}
main().catch(error => console.error(error))
