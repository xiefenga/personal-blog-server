import Router from '@koa/router'
import { getBings, getTodayBing } from '../services/bingServices';

const router = new Router();

router.get('/', async (ctx, next) => {
  const bing = await getTodayBing();
  ctx.body = {
    status: 'success',
    data: bing
  };
});

router.get('/all', async (ctx, next) => {
  const { page, size } = ctx.request.query;
  const res = await getBings(page as string, size as string);
  ctx.body = typeof res === 'string'
    ? { status: 'fail', error: res }
    : { status: 'success', data: res };
});

export default router;