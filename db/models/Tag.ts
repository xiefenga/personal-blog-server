import mongoose from 'mongoose'
import { ITag } from '../types'

const { Schema, model } = mongoose;

const tagSchema = new Schema<ITag>({
  tagName: {
    type: String,
    required: true,
    unique: true
  }
}, { versionKey: false });

export default model('Tag', tagSchema);