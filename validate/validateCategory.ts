import { TopLevelCategoryModel, TwoLevelCategoryModel } from "../db"
import MiniCategory from "../entities/MiniCategory";

const checkTopLevelCategoryExist = async (id: string | string[]): Promise<boolean> => {
  return Array.isArray(id)
    ? (await Promise.all(id.map((id => TopLevelCategoryModel.findById(id))))).includes(null)
    : await TopLevelCategoryModel.findById(id)
      ? true
      : false;
}

const checkTwoLevelCategoryExist = async (categoryName: string, parentId: string): Promise<boolean> => {
  const twoLevels = await TwoLevelCategoryModel.find({ categoryName });
  return twoLevels.findIndex(c => c.parent.toString() === parentId) !== -1;
}

const checkParentCategoryCorrect = async (twoLevelId: string, topLevelId?: string): Promise<boolean> => {
  const twoLevelInfo = await TwoLevelCategoryModel.findById(twoLevelId);
  if (twoLevelInfo) {
    const parent = twoLevelInfo.parent.toString();
    return topLevelId
      ? parent === topLevelId
        ? true
        : false
      : checkTopLevelCategoryExist(parent);
  } else {
    return false;
  }
}

const checkCategoryCorrect = async (miniCategory: MiniCategory): Promise<boolean> => {
  const { topLevel, twoLevel } = miniCategory;
  return twoLevel
    ? checkParentCategoryCorrect(twoLevel, topLevel)
    : checkTopLevelCategoryExist(topLevel);
}

const checkCategoriesCorrect = async (miniCategories: MiniCategory | MiniCategory[]): Promise<boolean> => {
  return Array.isArray(miniCategories)
    ? !(await Promise.all(miniCategories.map(c => checkCategoryCorrect(c)))).includes(false)
    : checkCategoryCorrect(miniCategories);
}

export {
  checkCategoryCorrect,
  checkCategoriesCorrect,
  checkTopLevelCategoryExist,
  checkTwoLevelCategoryExist,
  checkParentCategoryCorrect
}