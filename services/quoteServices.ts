import { QuoteModel } from "../db"
import { IQuote } from "../db/types"
import { getDailyquote } from "../request"
import { validatePage } from "../validate/validatePage"

const getTodayQuote = async (): Promise<IQuote> => {
  const [quote] = await QuoteModel.find().sort({ assign_date: -1 }).limit(1);
  return quote;
}

const getQuotes = async (page: number = 1, size: number = 10): Promise<string | IQuote[]> => {
  const error = validatePage(page, size);
  if (typeof error === 'string') { return error; }
  const quotes = await QuoteModel.find().sort({ assign_date: 1 }).skip((page - 1) * size).limit(size);
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