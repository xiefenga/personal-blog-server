import tagRouter from './tag'
import bingRouter from './bing'
import Router from '@koa/router'
import quoteRouter from './quote'
import articleRouter from './article'
import categoryRouter from './category'

const router = new Router();

router.use('/tag', tagRouter.routes(), tagRouter.allowedMethods());

router.use('/bing', bingRouter.routes(), bingRouter.allowedMethods());

router.use('/quote', quoteRouter.routes(), quoteRouter.allowedMethods());

router.use('/article', articleRouter.routes(), articleRouter.allowedMethods());

router.use('/category', categoryRouter.routes(), categoryRouter.allowedMethods());

export default router;