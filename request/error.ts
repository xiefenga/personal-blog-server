const createAxiosErrorRes = (axiosError: any) => ({
  error: axiosError.message,
  info: {
    code: axiosError.code,
    hostname: axiosError.hostname,
    url: axiosError.config.url,
    method: axiosError.config.method,
    response: axiosError.response
  }
})

export default createAxiosErrorRes;