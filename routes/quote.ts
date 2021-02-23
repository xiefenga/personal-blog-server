import Router from '@koa/router'
import queryToNumber from '../util/transformQuery'
import { getQuotes, getTodayQuote } from '../services/quoteServices'

const router = new Router();

router.get('/', async ctx => {
  const quote = await getTodayQuote();
  ctx.body = { status: 'success', data: quote };
});

router.get('/all', async ctx => {
  const { page, size } = ctx.request.query;
  const res = await getQuotes(queryToNumber(page), queryToNumber(size));
  ctx.body = typeof res === 'string'
    ? { status: 'fail', error: res }
    : { status: 'success', data: res };
});

export default router;