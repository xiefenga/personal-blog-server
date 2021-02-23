import { BingBGModel } from "../db"
import { IBingBG } from "../db/types"
import { getDailyImage } from "../request"
import { validatePage } from "../validate/validatePage";

const getTodayBing = async (): Promise<IBingBG> => {
  const [bing] = await BingBGModel.find().sort({ date: -1 }).limit(1);
  return bing;
}

const getBings = async (page: number = 1, size: number = 10): Promise<string | IBingBG[]> => {
  const error = validatePage(page, size);
  if (typeof error === 'string') { return error; }
  const bings = await BingBGModel.find().sort({ date: -1 }).skip(size * (page - 1)).limit(size);
  return bings;
}

const saveTodayBing = async () => {
  const res = await getDailyImage();
  if (!res.error) {
    await BingBGModel.create(res);
    return true;
  }
  return res;
}

export { getTodayBing, getBings, saveTodayBing }