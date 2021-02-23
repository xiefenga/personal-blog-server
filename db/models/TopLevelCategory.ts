import mongoose from 'mongoose'
import { ITopLevelCategory } from '../types'

const { Schema, model } = mongoose;

const categorySchema = new Schema<ITopLevelCategory>({
  categoryName: {
    type: String,
    required: true,
    unique: true
  }
});

export default model('TopLevelCategory', categorySchema);