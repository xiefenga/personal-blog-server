import Router from '@koa/router'
import queryToNumber from '../util/transformQuery'
import {
  addArticle,
  deleteArticle,
  getArticleById,
  getArticles,
  updateArticle
} from '../services/articleServices';

const router = new Router();

router.get('/', async ctx => {
  let { page, size } = ctx.request.query;
  const res = await getArticles(queryToNumber(page), queryToNumber(size));
  ctx.body = typeof res === 'string'
    ? { status: 'fail', error: res }
    : { status: 'success', data: res[0], count: res[1] };
});

router.get('/:id', async ctx => {
  const { id } = ctx.params;
  const res = await getArticleById(id);
  ctx.body = typeof res === 'string'
    ? { status: 'fail', error: res }
    : { status: 'success', data: res };
});

router.post('/', async ctx => {
  const res = await addArticle(ctx.request.body);
  ctx.body = Array.isArray(res)
    ? { status: 'fail', error: res }
    : { status: 'success', data: res };
});

router.put('/:id', async ctx => {
  const { id } = ctx.params;
  const res = await updateArticle(id, ctx.request.body);
  ctx.body = Array.isArray(res)
    ? { status: 'fail', error: res }
    : { status: 'success' };
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;
  await deleteArticle(id);
  ctx.body = { status: 'success' };
});

export default router;