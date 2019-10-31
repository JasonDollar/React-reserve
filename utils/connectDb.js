import mongoose from 'mongoose'

const connection = {}

const connectDb = async () => {
  if (connection.isConnected) {
    // use existiing db connection
    console.log('using existing connection')
    return
  }
  // use new database connection
  const db = await mongoose.connect(process.env.MONGO_SRV, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  console.log('db connected')
  connection.isConnected = db.connections[0].readyState
}
connectDb()

export default connectDb