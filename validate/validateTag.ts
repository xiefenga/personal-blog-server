import { TagModel } from "../db"

const checkTagExist = async (id: string | string[]): Promise<boolean> => {
  return Array.isArray(id)
    ? !(await Promise.all(id.map(id => TagModel.findById(id)))).includes(null)
    : (await TagModel.findById(id)) === null;
}



export { checkTagExist }