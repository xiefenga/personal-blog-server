import Router from '@koa/router'
import { getTopLevelArticles, getTwoLevelArticles } from '../services/articleServices';
import {
  getCategories,
  addTopLevelCategory,
  addTwoLevelCategory,
  deleteTopLevelCategory,
  deleteTwoLevelCategory,
  updateTopLevelCategory,
  updateTwoLevelCategory
} from '../services/categoryServices'

const router = new Router();

router.get('/', async (ctx, next) => {
  const categories = await getCategories();
  ctx.body = {
    status: 'success',
    data: categories
  };
});

router.get('/:id', async (ctx, next) => {
  const { id } = ctx.params;
  const { page, size } = ctx.request.query;
  const res = await getTopLevelArticles(id, page as string, size as string);
  ctx.body = typeof res === 'string'
    ? { status: 'fail', error: res }
    : { status: 'success', data: res[0], count: res[1] };
});

router.get('/:topId/:twoId', async (ctx, never) => {
  const { topId, twoId } = ctx.params;
  const { page, size } = ctx.request.query;
  const res = await getTwoLevelArticles(topId, twoId, page as string, size as string);
  ctx.body = typeof res === 'string'
    ? { status: 'fail', error: res }
    : { status: 'success', data: res[0], count: res[1] };
});

router.post('/topLevel', async (ctx, next) => {
  const topLevel = await addTopLevelCategory(ctx.request.body);
  ctx.body = Array.isArray(topLevel)
    ? { status: 'fail', error: topLevel }
    : { status: 'success', data: topLevel };
});

router.post('/twoLevel', async (ctx, next) => {
  const twoLevel = await addTwoLevelCategory(ctx.request.body);
  ctx.body = Array.isArray(twoLevel)
    ? { status: 'fail', error: twoLevel }
    : { status: 'success', data: twoLevel }
});

router.put('/topLevel/:id', async (ctx, next) => {
  const { id } = ctx.params;
  const res = await updateTopLevelCategory(id, ctx.request.body);
  ctx.body = Array.isArray(res)
    ? { status: 'fail', error: res }
    : { status: 'success' };
});

router.put('/twoLevel/:id', async (ctx, next) => {
  const { id } = ctx.params;
  const res = await updateTwoLevelCategory(id, ctx.request.body);
  ctx.body = Array.isArray(res)
    ? { status: 'fail', error: res }
    : { status: 'success' };
});

router.delete('/topLevel/:id', async (ctx, next) => {
  const { id } = ctx.params;
  const res = await deleteTopLevelCategory(id);
  ctx.body = typeof res === 'string'
    ? { status: 'fail', error: res }
    : { status: 'success' };
});

router.delete('/twoLevel/:id', async (ctx, next) => {
  const { id } = ctx.params;
  const res = await deleteTwoLevelCategory(id);
  ctx.body = typeof res === 'string'
    ? { status: 'fail', error: res }
    : { status: 'success' };
});

export default router;