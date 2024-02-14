//0_interfaces/http/controller/httpServer
import Router from '@koa/router'; 
import logger from 'koa-logger';
import Koa, { type Context } from 'koa';
import serve from 'koa-static';
import path from 'path';
import bodyParser from 'koa-bodyparser';


import { InMemoryMealEntryRepository } from '../../3_infrastructure/inMemoryMealEntryRepository';
import { LogMealEntry } from '../../1_application/logMealEntry';

import { GetAllMealEntries } from '../../1_application/getAllMealEntries';
import { GetAllPublicMealEntries } from '../../1_application/getAllPublicMealEntries';
import { UpdateMealEntry } from '../../1_application/updateMealEntry';
import { MealEntryController } from './controller/mealEntryController';

export function startServer(): void {
  const app = new Koa();
  const router = new Router(); 

  const mealEntryRepository = new InMemoryMealEntryRepository();
  const logMealEntry = new LogMealEntry(mealEntryRepository);
  const getAllPublicMealEntries = new GetAllPublicMealEntries(mealEntryRepository);
  const getAllMealEntries = new GetAllMealEntries(mealEntryRepository);
  const updateMealEntries = new GetAllPublicMealEntries(mealEntryRepository);
  const mealEntryController = new MealEntryController(logMealEntry, getAllPublicMealEntries, getAllMealEntries, updateMealEntries);
  
  const publicDir = path.join(__dirname, '../../view'); 
  
  //config dir
  app.use(serve(publicDir));
  
  // middleware and routes
  app.use(logger());
  app.use(bodyParser());
  app.use(router.routes()).use(router.allowedMethods());

  // Hello
   const helloWorld = (ctx: Context) => {
    ctx.type = 'html';
    ctx.body = `Hello World!! </br>
                <a href="/view/meal-entry-form">1. Log my meal entry</a></br>
                <a href="/meal-entries/public">2. View Public Meal Entries</a></br>
                <a href="/meal-entries">3. View all my meal entries</a></br>
                <a href="/meal-entries/:id">4. Update my meal entries</a></br>`;
    };

  router.get('/', helloWorld);

  // 1. New Meal
  router.get('/view/meal-entry-form', mealEntryController.showMealEntryForm.bind(mealEntryController));
  router.post('/meal-entries', mealEntryController.addMealEntry.bind(mealEntryController));  

  // 2. View Public Meal Entries
  router.get('/meal-entries/public', mealEntryController.getAllPublic.bind(mealEntryController));
  
  // 3. View all my meal entries
  router.get('/meal-entries', mealEntryController.getAll.bind(mealEntryController));

  // 4. Update my meal entries
  router.put('/meal-entries/:id', mealEntryController.updateMealEntry.bind(mealEntryController));


  
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}
