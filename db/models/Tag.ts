import mongoose from 'mongoose'
import { ITag } from '../types'

const { Schema, model } = mongoose;

const ObjectId = mongoose.Schema.Types.ObjectId;

const tagSchema = new Schema<ITag>({
  tagName: {
    type: String,
    required: true,
    unique: true
  }
});

export default model('Tag', tagSchema);