import axios from './axios'
import createAxiosErrorRes from './error'

const url = "https://apiv3.shanbay.com/weapps/dailyquote/quote/";

// 返回结果有 error 代表发送错误
const getDailyquote = async () => {
  try {
    const { content, author, assign_date, translation } = (await axios.get(url)) as any;
    return {
      content,
      author,
      assign_date,
      translation
    }
  } catch (error) {
    return error.isAxiosError
      ? createAxiosErrorRes(error)
      : { error }
  }
}

export default getDailyquote;