//0_interfaces/http/controller/httpServer
import Router from '@koa/router'; 
import logger from 'koa-logger';
import Koa, { type Context } from 'koa';
import serve from 'koa-static';
import path from 'path';

import { InMemoryMealEntryRepository } from '../../3_infrastructure/inMemoryMealEntryRepository';
import { LogMealEntry } from '../../1_application/logMealEntry';

import { GetAllMealEntries } from '../../1_application/getAllMealEntries';
import { GetAllPublicMealEntries } from '../../1_application/getAllPublicMealEntries';
import { MealEntryController } from './controller/mealEntryController';

export function startServer(): void {
  const app = new Koa();
  const router = new Router(); 

  const mealEntryRepository = new InMemoryMealEntryRepository();
  const logMealEntry = new LogMealEntry(mealEntryRepository);
  const getAllMealEntries = new GetAllMealEntries(mealEntryRepository);
  const getAllPublicMealEntries = new GetAllPublicMealEntries(mealEntryRepository);
  const mealEntryController = new MealEntryController(getAllMealEntries, getAllPublicMealEntries, logMealEntry);
  
  const publicDir = path.join(__dirname, '../../view'); 
  
  //config dir
  app.use(serve(publicDir));
  
  // middleware and routes
  app.use(logger());
  app.use(router.routes()).use(router.allowedMethods());

  // Hello
   const helloWorld = (ctx: Context) => {
    ctx.body = `Hello World!! </br>
                <a href="/view/meal-entry-form">Add New Meal Entry</a></br>
                <a href="/meal-entries/public">View Public Meal Entries</a>`;
    };

  router.get('/', helloWorld);

  // New Meal
  router.get('/view/meal-entry-form', mealEntryController.showMealEntryForm.bind(mealEntryController));

  // GetAllMealEntries
  router.get('/meal-entries', mealEntryController.getAll.bind(mealEntryController));
  router.post('/meal-entries', async (ctx: Context) => {
    const mealEntry = await logMealEntry.execute(ctx.request.body);
    ctx.body = mealEntry;
    ctx.status = 201;
  });

  // GetAllPublicMealEntries
  router.get('/meal-entries/public', mealEntryController.getAllPublic.bind(mealEntryController));


  
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}
