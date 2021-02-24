import OSS from "ali-oss"

const uploadALiOSS = async (filename: string, file: Buffer) => {
  const client = new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: 'LTAI4GC7mha3w3tGtxVP2BwN',
    accessKeySecret: 'A3GxBehW0zP46se6veL2ZbP4cI2z7J',
    bucket: 'xf-blog-imgs'
  });
  return await client.put('/person-blog/' + filename, file);
}

export { uploadALiOSS }

