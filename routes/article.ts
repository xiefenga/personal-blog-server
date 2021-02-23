import Router from '@koa/router'
import { addArticle, deleteArticle, getArticleById, getArticles, updateArticle } from '../services/articleServices';

const router = new Router();

router.get('/', async (ctx, next) => {
  const { page, size } = ctx.request.query;
  const articles = await getArticles(page as string, size as string);
  ctx.body = typeof articles === 'string'
    ? { status: 'fail', error: articles }
    : { status: 'success', data: articles[0], count: articles[1] };
});

router.get('/:id', async (ctx, next) => {
  const { id } = ctx.params;
  const article = await getArticleById(id);
  ctx.body = typeof article === 'string'
    ? { status: 'fail', error: article }
    : { status: 'success', data: article };
});

router.post('/', async (ctx, next) => {
  const article = await addArticle(ctx.request.body);
  ctx.body = Array.isArray(article)
    ? { status: 'fail', error: article }
    : { status: 'success', data: article };
});

router.put('/:id', async (ctx, next) => {
  const { id } = ctx.params;
  const errors = await updateArticle(id, ctx.request.body);
  ctx.body = Array.isArray(errors)
    ? { status: 'fail', error: errors }
    : { status: 'success' };
});

router.delete('/:id', async (ctx, next) => {
  const { id } = ctx.params;
  const error = await deleteArticle(id);
  ctx.body = typeof error === 'string'
    ? { status: 'fail', error }
    : { status: 'success' };
});

export default router;