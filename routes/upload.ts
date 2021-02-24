import { extname } from 'path'
import Router from '@koa/router'
import multer from '@koa/multer'
import { uploadALiOSS } from '../services/uploadServices'

const router = new Router();

const upload = multer();

router.post('/', upload.single('cover'), async ctx => {
  if (!ctx.header['content-type']?.includes('multipart/form-data;')) {
    ctx.throw(400, 'content-type is not allowed');
  }
  const ext = extname(ctx.file.originalname).slice(1).toLowerCase();
  if (!['jpg', 'png', 'svg', 'jpeg', 'gif'].includes(ext)) {
    ctx.throw(400, 'just allow img');
  }
  const { url } = await uploadALiOSS(ctx.file.originalname, ctx.file.buffer);
  ctx.body = { status: 'success', data: { url } };
});

export default router;
