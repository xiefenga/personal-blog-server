import OSS from "ali-oss"
import { resolve } from "path"
import { readFile } from "fs/promises"

const uploadALiOSS = async (filename: string, file: Buffer) => {
  const config = await readFile(resolve(__dirname, '../ossconfig.json'), { encoding: 'utf-8' });
  const client = new OSS(JSON.parse(config));
  return await client.put('/person-blog/' + filename, file);
}

export { uploadALiOSS }

