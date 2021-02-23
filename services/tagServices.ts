import Tag from "../entities/Tag"
import { ITag } from "../db/types"
import { ArticleModel, TagModel } from "../db"
import { plainToClass } from "class-transformer"
import validateModel from "../validate/validateModel"


const addTag = async (tagObj: object): Promise<string[] | ITag> => {
  const tag = plainToClass(Tag, tagObj);
  const errors = await validateModel(tag);
  if (errors.length) { return errors; }
  try {
    return await TagModel.create(tag);
  } catch (error) {
    errors.push('tag已存在');
  }
  return errors;
}


const deleteTag = async (id: string): Promise<string | boolean> => {
  const count = await ArticleModel.find({ tags: id }).countDocuments();
  if (count) { return '非空tag无法删除'; }
  await TagModel.deleteOne({ _id: id });
  return true;
}

const updateTag = async (id: string, tagObj: object): Promise<string[] | boolean> => {
  const tag = plainToClass(Tag, tagObj);
  const errors = await validateModel(tag);
  if (errors.length) { return errors; }
  const tagInfo = await TagModel.findById(id);
  if (tagInfo) {
    try {
      tagInfo.tagName = tag.tagName;
      await tagInfo.save();
    } catch (error) {
      return ['tag已存在'];
    }
  }
  return true;
}

const getTags = async (): Promise<ITag[]> => TagModel.find({});

export { addTag, deleteTag, updateTag, getTags }