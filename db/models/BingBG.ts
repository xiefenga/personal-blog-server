import mongoose from 'mongoose'
import { IBingBG } from '../types'

const { Schema, model } = mongoose;

const bingSchema = new Schema<IBingBG>({
  url: {
    type: String,
    required: true
  },
  copyright: {
    type: String
  },
  date: {
    type: Date
  }
}, { versionKey: false });

export default model('Bing', bingSchema);