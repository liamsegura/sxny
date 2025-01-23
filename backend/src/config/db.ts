import mongoose from 'mongoose'

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI || ''
    await mongoose.connect(mongoURI, {})
    console.log('MongoDB connected successfully')
  } catch (err) {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  }
}

export default connectDB
