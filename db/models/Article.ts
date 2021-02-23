import mongoose from 'mongoose'
import { IMiniCategory, IArticle } from '../types'

const { Schema, model } = mongoose;

const ObjectId = mongoose.Schema.Types.ObjectId;

const categorySchema = new Schema<IMiniCategory>({
  topLevel: {
    type: ObjectId,
    required: true,
  },
  twoLevel: ObjectId
});

const articleSchema = new Schema<IArticle>({
  title: {
    type: String,
    required: true,
    unique: true
  },
  markdown: {
    type: String,
    required: true
  },
  html: {
    type: String,
    required: true
  },
  categories: {
    type: [categorySchema],
    required: true,
    index: true
  },
  tags: {
    type: [ObjectId],
    required: true,
    index: true
  },
  wordcount: {
    type: Number
  },
  readingTime: {
    type: Number
  },
  postCover: {
    type: String,
    default: '/assets/default.jpg'
  }
}, { timestamps: true });

export default model('Article', articleSchema);