//0_interfaces/http/controller/httpServer
import Router from '@koa/router'; 
import logger from 'koa-logger';
import Koa, { type Context } from 'koa';

import { InMemoryMealEntryRepository } from '../../3_infrastructure/inMemoryMealEntryRepository';
import { LogMealEntry } from '../../1_application/logMealEntry';
import { GetAllMealEntries } from '../../1_application/getAllMealEntries';
import { MealEntryController } from './controller/mealEntryController';

export function startServer(): void {
  const app = new Koa();
  const router = new Router(); 

  const mealEntryRepository = new InMemoryMealEntryRepository();
  const logMealEntry = new LogMealEntry(mealEntryRepository);
  const getAllMealEntries = new GetAllMealEntries(mealEntryRepository);
  const mealEntryController = new MealEntryController(getAllMealEntries);

  router.get('/meal-entries', mealEntryController.getAll.bind(mealEntryController));

  router.post('/meal-entries', async (ctx: Context) => {
    const mealEntry = await logMealEntry.execute(ctx.request.body);
    ctx.body = mealEntry;
    ctx.status = 201;
  });

  app.use(logger());

  const helloWorld = (ctx: Context) => {
   ctx.body = 'Hello World!!';;
  };

  router.get('/', helloWorld);

  app.use(router.routes()).use(router.allowedMethods());
  
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}
