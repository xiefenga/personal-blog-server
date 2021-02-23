import mongoose from 'mongoose'
import { ITopLevelCategory } from '../types'

const { Schema, model } = mongoose;

const categorySchema = new Schema<ITopLevelCategory>({
  categoryName: {
    type: String,
    required: true,
    unique: true
  }
}, { versionKey: false });

export default model('TopLevelCategory', categorySchema);