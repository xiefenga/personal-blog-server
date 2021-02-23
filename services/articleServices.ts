import { ArticleModel, TagModel, TopLevelCategoryModel, TwoLevelCategoryModel } from "../db"
import { IArticle } from "../db/types"
import Article from "../entities/Article"
import { isMongoId } from "class-validator"
import { plainToClass } from "class-transformer"
import validateModel from "../validate/validateModel"
import { checkTagExist } from "../validate/validateTag"
import { checkCategoriesCorrect } from "../validate/validateCategory"
import { IResArticle } from "../types"


/**
 * 新增文章，成功返回新添加的信息，失败返回错误消息
 * @param articleObj 添加的文章信息
 */
const addArticle = async (articleObj: object): Promise<string[] | IArticle> => {
  const article = plainToClass(Article, articleObj);
  const errors = await validateModel(article);
  if (errors.length) { return errors; }
  const correct = await Promise.all([checkCategoriesCorrect(article.categories), checkTagExist(article.tags)]);
  (!correct[0]) && errors.push('文章类目有误');
  (!correct[1]) && errors.push('文章标签有误');
  if (errors.length === 0) {
    try {
      return await ArticleModel.create(article);
    } catch (error) {
      errors.push('title已存在');
    }
  }
  return errors;
}

/**
 * 修改文章，成功返回 true，失败返回错误消息
 * @param id 文章id
 * @param miniArticle 修改的文章属性，一般为一个 plain-object
 */
const updateArticle = async (id: string, miniArticle: object): Promise<string[] | boolean> => {
  if (isMongoId(id)) {
    const articleUpdate = plainToClass(Article, miniArticle);
    const errors = await validateModel(articleUpdate, true);
    if (errors.length) { return errors; }
    // 验证 categories 和 tags
    const validates = [];
    if (articleUpdate.categories) {
      validates.push(checkCategoriesCorrect(articleUpdate.categories));
    }
    if (articleUpdate.tags) {
      validates.push(checkTagExist(articleUpdate.tags));
    }
    const correct = await Promise.all(validates);
    if (correct.includes(false)) {
      errors.push('文章类目/标签有误');
    }
    if (errors.length) { return errors; }
    const res = await ArticleModel.updateOne({ _id: id }, miniArticle)
    // { n: 1, nModified: 1, ok: 1 }
    // { n: 0, nModified: 0, ok: 1 }
    if (res.n) {
      return true;
    }
    return ['该文章不存在'];
  }
  return ['id非法，应为mongoId'];
}

/**
 * 删除成功返回 true，失败返回错误消息
 * @param id 文章id
 */
const deleteArticle = async (id: string): Promise<string | boolean> => {
  if (isMongoId(id)) {
    await ArticleModel.deleteOne({ _id: id });
    return true;
  }
  return 'id非法，应为mongoId';
}

const getArticleById = async (id: string): Promise<string | any> => {
  if (isMongoId(id)) {
    const article = await ArticleModel.findById(id, '-__v');
    if (article) {
      const tags = await Promise.all(article.tags.map(tag => TagModel.findById(tag, '-__v')));
      const categories = await Promise.all(article.categories.map(async ({ topLevel, twoLevel }) => {
        const res: any = {};
        res.topLevel = await TopLevelCategoryModel.findById(topLevel, '-__v');
        if (twoLevel) {
          res.twoLevel = await TwoLevelCategoryModel.findById(twoLevel, { __v: 0, parent: 0 });
        }
        return res;
      }));
      let res: any = { ...article };
      res = { ...res._doc, categories, tags };
      return res;
    }

    return '该文章不存在';
  }
  return 'id非法，应为mongoId';
}

/**
 * 分页获取文章
 * @param page 页数
 * @param size 页容量
 */
const getArticles = async (page: number | string = 1, size: number | string = 10): Promise<string | [any[], number]> => {
  page = Number(page);
  size = Number(size);
  if (page <= 0 || size <= 0 || !Number.isInteger(page) || !Number.isInteger(size)) {
    return '参数有误';
  }
  const count = await ArticleModel.find().countDocuments();
  const articles = await ArticleModel.find({}, '-__v').sort({ createdAt: -1 }).skip(size * (page - 1)).limit(size);
  const res = await Promise.all(articles.map(async (article) => {
    const categoriesPromises = Promise.all(article.categories.map(async ({ _id, topLevel, twoLevel }) => {
      const arr = [TopLevelCategoryModel.findById(topLevel, '-__v')];
      if (twoLevel) {
        arr.push(TwoLevelCategoryModel.findById(twoLevel, '-__v'))
      }
      const res = await Promise.all(arr);
      return res.length === 2
        ? { _id, topLevel: res[0], twoLevel: res[1] }
        : { _id, topLevel: res[0] }
    }));
    const tagsPromises = Promise.all(
      article.tags.map(async tag => await TagModel.findById(tag, '-__v'))
    );
    const [newCategories, newTags] = await Promise.all([categoriesPromises, tagsPromises]);

    let res: any = { ...article };
    res = { ...res._doc };
    res.categories = newCategories;
    res.tags = newTags;
    return res;
  }));
  return [res, count];
  // return [articles, count];
}

const getTopLevelArticles = async (id: string, page: number | string = 1, size: number | string = 10): Promise<string | [Article[], number]> => {
  if (isMongoId(id)) {
    page = Number(page);
    size = Number(size);
    if (page <= 0 || size <= 0 || !Number.isInteger(page) || !Number.isInteger(size)) {
      return 'page/size有误';
    }
    const count = await ArticleModel.find({ "categories.topLevel": id }).countDocuments();
    const articles = await ArticleModel.find({ "categories.topLevel": id }, '-__v').sort({ createdAt: 1 }).skip(size * (page - 1)).limit(size);
    return [articles, count];
  }
  return 'id非法，应为mongoId';
}
const getTwoLevelArticles = async (topId: string, twoId: string, page: number | string = 1, size: number | string = 10): Promise<string | [Article[], number]> => {
  if (isMongoId(topId) && isMongoId(twoId)) {
    page = Number(page);
    size = Number(size);
    if (page <= 0 || size <= 0 || !Number.isInteger(page) || !Number.isInteger(size)) {
      return 'page/size有误';
    }
    const count = await ArticleModel.find({ "categories.topLevel": topId, "categories.twoLevel": twoId }).countDocuments();
    const articles = await ArticleModel.find({ "categories.topLevel": topId, "categories.twoLevel": twoId }, '-__v').sort({ createdAt: 1 }).skip(size * (page - 1)).limit(size);
    return [articles, count];
  }
  return 'id非法，应为mongoId';
}


export {
  addArticle,
  getArticles,
  updateArticle,
  deleteArticle,
  getArticleById,
  getTopLevelArticles,
  getTwoLevelArticles
}