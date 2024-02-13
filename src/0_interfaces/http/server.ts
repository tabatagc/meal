import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { InMemoryMealEntryRepository } from '../../0_infrastructure/inMemoryMealEntryRepository';
import { LogMealEntry } from '../../1_application/logMealEntry';

const app = new Koa();
const router = new Router();

const mealEntryRepository = new InMemoryMealEntryRepository();
const logMealEntry = new LogMealEntry(mealEntryRepository);

router.post('/meal-entries', async (ctx) => {
  const mealEntry = await logMealEntry.execute(ctx.request.body);
  ctx.body = mealEntry;
  ctx.status = 201;
});

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
