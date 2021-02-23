import { Document } from "mongoose"
import Tag from "../../entities/Tag"
import Bing from "../../entities/Bing"
import Quote from "../../entities/Quote"
import Article from "../../entities/Article"
import MiniCategory from "../../entities/MiniCategory"
import { TopLevelCategory, TwoLevelCategory } from '../../entities/Category'



export interface ITag extends Tag, Document { }

export interface IBingBG extends Bing, Document { }

export interface IQuote extends Quote, Document { }

export interface IArticle extends Article, Document { }

export interface IMiniCategory extends MiniCategory, Document { }

export interface ITopLevelCategory extends TopLevelCategory, Document { }

export interface ITwoLevelCategory extends TwoLevelCategory, Document { }

