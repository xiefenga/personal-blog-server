import Router from '@koa/router'
import { addTag, deleteTag, getTag, getTags, updateTag } from '../services/tagServices';

const router = new Router();

router.get('/', async (ctx, next) => {
  const tags = await getTags();
  ctx.body = {
    status: 'success',
    data: tags
  };
});

router.get('/:id', async (ctx, next) => {
  const { id } = ctx.params;
  const tag = await getTag(id);
  ctx.body = typeof tag === 'string'
    ? { status: 'fail', error: tag }
    : { status: 'success', data: tag };
});

router.post('/', async (ctx, next) => {
  const tag = await addTag(ctx.request.body);
  ctx.body = Array.isArray(tag)
    ? { status: 'fail', error: tag }
    : { status: 'success', data: tag };
});

router.put('/:id', async (ctx, next) => {
  const { id } = ctx.params;
  const res = await updateTag(id, ctx.request.body);
  ctx.body = Array.isArray(res)
    ? { status: 'fail', error: res }
    : { status: 'success' };
});

router.delete('/:id', async (ctx, next) => {
  const { id } = ctx.params;
  const res = await deleteTag(id);
  ctx.body = typeof res === 'string'
    ? { status: 'fail', error: res }
    : { status: 'success' };
});

export default router;