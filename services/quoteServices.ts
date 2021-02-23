import { QuoteModel } from "../db"
import { IQuote } from "../db/types";
import { getDailyquote } from "../request";

const getTodayQuote = async (): Promise<IQuote> => {
  const [quote] = await QuoteModel.find().sort({ assign_date: -1 }).limit(1);
  return quote;
}

const getQuotes = async (page: number | string = 1, size: number | string = 10): Promise<string | IQuote[]> => {
  page = Number(page);
  size = Number(size);
  if (page <= 0 || size <= 0 || !Number.isInteger(page) || !Number.isInteger(size)) {
    return '参数非法';
  }
  const quotes = await QuoteModel.find({}, '-__v').sort({ assign_date: 1 }).skip((page - 1) * size).limit(size);
  return quotes;
}

const saveTodayQuote = async () => {
  const res = await getDailyquote();
  if (!res.error) {
    await QuoteModel.create(res);
    return true;
  }
  return res;
}

export { getTodayQuote, getQuotes, saveTodayQuote }