import { BingBGModel } from "../db"
import { IBingBG } from "../db/types"
import { getDailyImage } from "../request"

const getTodayBing = async (): Promise<IBingBG> => {
  const [bing] = await BingBGModel.find({}, '-__v').sort({ date: -1 }).limit(1);
  return bing;
}

const getBings = async (page: number | string = 1, size: number | string = 10): Promise<string | IBingBG[]> => {
  page = Number(page);
  size = Number(size);
  if (page <= 0 || size <= 0 || !Number.isInteger(page) || !Number.isInteger(size)) {
    return '参数非法';
  }
  const bings = await BingBGModel.find({}, '-__v').sort({ date: 1 }).limit(1);
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