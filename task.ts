import { scheduleJob } from "node-schedule"
import { saveTodayBing } from "./services/bingServices"
import { saveTodayQuote } from "./services/quoteServices"

const job = scheduleJob('* * 8 * * *', () => {
  saveTodayQuote();
  saveTodayBing();
});

job.invoke();