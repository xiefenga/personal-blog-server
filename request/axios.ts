import axios from "axios"

const instance = axios.create();

instance.interceptors.response.use(
  response => response.data
)


export default instance;