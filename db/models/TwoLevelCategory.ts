import mongoose from 'mongoose'
import { ITwoLevelCategory } from '../types'

const { Schema, model } = mongoose;

const ObjectId = mongoose.Schema.Types.ObjectId;

const categorySchema = new Schema<ITwoLevelCategory>({
  categoryName: {
    type: String,
    required: true
  },
  parent: {
    type: ObjectId,
    ref: 'TopLevelCategory'
  }
}, { versionKey: false });

export default model('TwoLevelCategory', categorySchema);