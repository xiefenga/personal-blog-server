import Router from '@koa/router'
import queryToNumber from '../util/transformQuery'
import { getTagArticles } from '../services/articleServices'
import { addTag, deleteTag, getTags, updateTag } from '../services/tagServices';

const router = new Router();

router.get('/', async ctx => {
  const tags = await getTags();
  ctx.body = { status: 'success', data: tags };
});

router.get('/:id', async ctx => {
  const { id } = ctx.params;
  const { page, size } = ctx.request.query;
  const res = await getTagArticles(id, queryToNumber(page), queryToNumber(size));
  ctx.body = typeof res === 'string'
    ? { status: 'fail', error: res }
    : { status: 'success', data: res[0], count: res[1] };
});

router.post('/', async ctx => {
  const res = await addTag(ctx.request.body);
  ctx.body = Array.isArray(res)
    ? { status: 'fail', error: res }
    : { status: 'success', data: res };
});

router.put('/:id', async ctx => {
  const { id } = ctx.params;
  const res = await updateTag(id, ctx.request.body);
  ctx.body = Array.isArray(res)
    ? { status: 'fail', error: res }
    : { status: 'success' };
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;
  const res = await deleteTag(id);
  ctx.body = typeof res === 'string'
    ? { status: 'fail', error: res }
    : { status: 'success' };
});

export default router;