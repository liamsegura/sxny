import mongoose, { Document, Schema } from 'mongoose'

export interface ICacheData extends Document {
  key: string
  data: Record<string, any>
  updatedAt: Date
}

const CacheDataSchema: Schema = new Schema({
  key: { type: String, required: true, unique: true },
  data: { type: Schema.Types.Mixed, required: true },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model<ICacheData>('CacheData', CacheDataSchema)
