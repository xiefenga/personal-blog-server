import { ICategory } from "../types"
import { isMongoId } from "class-validator"
import { plainToClass } from "class-transformer"
import validateModel from "../validate/validateModel"
import { ITopLevelCategory, ITwoLevelCategory } from "../db/types"
import { checkTwoLevelCategoryExist } from "../validate/validateCategory"
import { TopLevelCategory, TwoLevelCategory } from "../entities/Category"
import { ArticleModel, TopLevelCategoryModel, TwoLevelCategoryModel } from "../db"


const addTopLevelCategory = async (categoryObj: object): Promise<string[] | ITopLevelCategory> => {
  const category = plainToClass(TopLevelCategory, categoryObj);
  const errors = await validateModel(category);
  if (errors.length) { return errors; }
  try {
    return await TopLevelCategoryModel.create(category);
  } catch (error) {
    errors.push('category已存在');
  }
  return errors;
}

const addTwoLevelCategory = async (categoryObj: object): Promise<string[] | ITwoLevelCategory> => {
  const category = plainToClass(TwoLevelCategory, categoryObj);
  const errors = await validateModel(category);
  if (errors.length) { return errors; }
  // 检测 category 的关系问题
  const parent = await TopLevelCategoryModel.findById(category.parent);
  if (parent) {
    const exist = await checkTwoLevelCategoryExist(category.categoryName, category.parent);
    if (exist) {
      errors.push('category已存在');
    } else {
      return await TwoLevelCategoryModel.create(category);
    }
  } else {
    errors.push('parent category不存在');
  }
  return errors;
}

const getTopLevelCategory = async (id: string): Promise<string | ITopLevelCategory> => {
  return isMongoId(id)
    ? await TopLevelCategoryModel.findById(id, '-__v') || '不存在该类目'
    : 'id非法，应为mongoId';
}

const getTwoLevelCategory = async (id: string): Promise<string | ITwoLevelCategory> => {
  return isMongoId(id)
    ? await TwoLevelCategoryModel.findById(id, '-__v') || '不存在该类目'
    : 'id非法，应为mongoId';
}

const getCategories = async (): Promise<ICategory[]> => {
  const topLevels = await TopLevelCategoryModel.find({}, '-__v');
  const categories = await Promise.all(topLevels.map(async parent => ({
    topLevel: parent,
    twoLevels: await TwoLevelCategoryModel.find({ parent: parent._id }, { parent: 0, __v: 0 })
  })));
  return categories;
}

const updateTopLevelCategory = async (id: string, update: object): Promise<string[] | boolean> => {
  if (isMongoId(id)) {
    const topLevel = plainToClass(TopLevelCategory, update);
    const errors = await validateModel(topLevel);
    if (errors.length) { return errors };
    const topLevelInfo = await TopLevelCategoryModel.findById(id);
    if (topLevelInfo) {
      try {
        topLevelInfo.categoryName = topLevel.categoryName;
        await topLevelInfo.save();
        return true;
      } catch (error) {
        return ['category已存在'];
      }
    }
    return ['category不存在'];
  }
  return ['id非法，应为mongoId'];
}

const updateTwoLevelCategory = async (id: string, update: object): Promise<string[] | boolean> => {
  if (isMongoId(id)) {
    const twoLevel = plainToClass(TwoLevelCategory, update);
    if (twoLevel.parent) { return ['不允许修改parent类目']; }
    if (!twoLevel.categoryName) { return ['categoryNmae为空']; }
    const errors = await validateModel(twoLevel, true);
    if (errors.length) { return errors };
    const twoLevelInfo = await TwoLevelCategoryModel.findById(id);
    if (twoLevelInfo) {
      if (twoLevelInfo.categoryName === twoLevel.categoryName) {
        return true;
      }
      const exists = await checkTwoLevelCategoryExist(twoLevel.categoryName, twoLevelInfo.parent)
      if (exists) {
        return ['category已存在'];
      }
      twoLevelInfo.categoryName = twoLevel.categoryName;
      await twoLevelInfo.save();
      return true;
    }
    return ['category不存在'];
  }
  return ['id非法，应为mongoId'];
}

const deleteTopLevelCategory = async (id: string): Promise<string | boolean> => {
  if (isMongoId(id)) {
    const count = await ArticleModel.find({ 'categories.topLevel': id }).countDocuments();
    if (count) {
      return '非空category无法删除';
    }
    await TwoLevelCategoryModel.deleteMany({ parent: id });
    await TopLevelCategoryModel.deleteOne({ _id: id });
    return true;
  }
  return 'id非法，应为mongoId';
}

const deleteTwoLevelCategory = async (id: string): Promise<string | boolean> => {
  if (isMongoId(id)) {
    const count = await ArticleModel.find({ 'categories.twoLevel': id }).countDocuments();
    if (count) {
      return '非空category无法删除';
    }
    await TwoLevelCategoryModel.deleteOne({ _id: id });
    return true;
  }
  return 'id非法，应为mongoId';
}

export {
  getCategories,
  addTopLevelCategory,
  addTwoLevelCategory,
  getTopLevelCategory,
  getTwoLevelCategory,
  updateTopLevelCategory,
  updateTwoLevelCategory,
  deleteTopLevelCategory,
  deleteTwoLevelCategory
}