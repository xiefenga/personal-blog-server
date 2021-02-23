import Router from '@koa/router'
import { getQuotes, getTodayQuote } from '../services/quoteServices';

const router = new Router();

router.get('/', async (ctx, next) => {
  const quote = await getTodayQuote();
  ctx.body = {
    status: 'success',
    data: quote
  };
});

router.get('/all', async (ctx, next) => {
  const { page, size } = ctx.request.query;
  const res = await getQuotes(page as string, size as string);
  ctx.body = typeof res === 'string'
    ? { status: 'fail', error: res }
    : { status: 'success', data: res };
});

export default router;