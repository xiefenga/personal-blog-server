import mongoose from 'mongoose'
import { IQuote } from '../types'

const { Schema, model } = mongoose;

const quoteSchema = new Schema<IQuote>({
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  assign_date: {
    type: Date,
    required: true
  },
  translation: {
    type: String,
    required: true
  }
}, { versionKey: false });

export default model('Quote', quoteSchema);