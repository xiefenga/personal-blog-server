import axios from './axios'
import createAxiosErrorRes from './error'


const baseUrl = "https://cn.bing.com";

const bingUrl = "https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&nc=1586183781119&pid=hp&uhd=1&uhdwidth=2880&uhdheight=1620";

// 返回结果有 error 代表发送错误
const getDailyImage = async () => {
  try {
    const { images: [image] } = (await axios.get(bingUrl)) as any;
    const { url, copyright, startdate: date } = image;
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6);
    return {
      url: baseUrl + url,
      copyright,
      date: `${year}-${month}-${day}`
    }
  } catch (error) {
    return error.isAxiosError
      ? createAxiosErrorRes(error)
      : { error }
  }
}

export default getDailyImage;