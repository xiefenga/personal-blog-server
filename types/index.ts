import { Document } from "mongoose";
import { IArticle, IMiniCategory, ITag, ITopLevelCategory, ITwoLevelCategory } from "../db/types";
import Article from "../entities/Article";
import MiniCategory from "../entities/MiniCategory";

interface ICategory {
  topLevel: ITopLevelCategory
  twoLevels: ITwoLevelCategory[]
}

interface IResponse {
  status: 'success' | 'fail'
  data?: object
  error?: string | string[]
  count?: number
}

interface IResCategory {
  topLevel: ITopLevelCategory
  twoLevel?: ITwoLevelCategory
}

interface IResArticle extends Document {
  title: string
  markdown: string
  html: string
  categories: IResCategory[]
  tags: ITag[]
}

export { ICategory, IResponse, IResArticle }