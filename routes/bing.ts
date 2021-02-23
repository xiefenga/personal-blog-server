import Router from '@koa/router'
import { getBings, getTodayBing } from '../services/bingServices';
import queryToNumber from '../util/transformQuery';

const router = new Router();

router.get('/', async ctx => {
  const bing = await getTodayBing();
  ctx.body = { status: 'success', data: bing };
});

router.get('/all', async ctx => {
  const { page, size } = ctx.request.query;
  const res = await getBings(queryToNumber(page), queryToNumber(size));
  ctx.body = typeof res === 'string'
    ? { status: 'fail', error: res }
    : { status: 'success', data: res };
});

export default router;