import Router from '@koa/router'
import queryToNumber from '../util/transformQuery'
import {
  getTopLevelArticles,
  getTwoLevelArticles
} from '../services/articleServices'

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

router.get('/', async ctx => {
  const categories = await getCategories();
  ctx.body = { status: 'success', data: categories };
});

router.get('/:id', async ctx => {
  const { id } = ctx.params;
  const { page, size } = ctx.request.query;
  const res = await getTopLevelArticles(id, queryToNumber(page), queryToNumber(size));
  ctx.body = typeof res === 'string'
    ? { status: 'fail', error: res }
    : { status: 'success', data: res[0], count: res[1] };
});

router.get('/:topId/:twoId', async ctx => {
  const { topId, twoId } = ctx.params;
  const { page, size } = ctx.request.query;
  const res = await getTwoLevelArticles(topId, twoId, queryToNumber(page), queryToNumber(size));
  ctx.body = typeof res === 'string'
    ? { status: 'fail', error: res }
    : { status: 'success', data: res[0], count: res[1] };
});

router.post('/topLevel', async ctx => {
  const res = await addTopLevelCategory(ctx.request.body);
  ctx.body = Array.isArray(res)
    ? { status: 'fail', error: res }
    : { status: 'success', data: res };
});

router.post('/twoLevel', async ctx => {
  const res = await addTwoLevelCategory(ctx.request.body);
  ctx.body = Array.isArray(res)
    ? { status: 'fail', error: res }
    : { status: 'success', data: res }
});

router.put('/topLevel/:id', async ctx => {
  const { id } = ctx.params;
  const res = await updateTopLevelCategory(id, ctx.request.body);
  ctx.body = Array.isArray(res)
    ? { status: 'fail', error: res }
    : { status: 'success' };
});

router.put('/twoLevel/:id', async ctx => {
  const { id } = ctx.params;
  const res = await updateTwoLevelCategory(id, ctx.request.body);
  ctx.body = Array.isArray(res)
    ? { status: 'fail', error: res }
    : { status: 'success' };
});

router.delete('/topLevel/:id', async ctx => {
  const { id } = ctx.params;
  const res = await deleteTopLevelCategory(id);
  ctx.body = typeof res === 'string'
    ? { status: 'fail', error: res }
    : { status: 'success' };
});

router.delete('/twoLevel/:id', async ctx => {
  const { id } = ctx.params;
  const res = await deleteTwoLevelCategory(id);
  ctx.body = typeof res === 'string'
    ? { status: 'fail', error: res }
    : { status: 'success' };
});

export default router;