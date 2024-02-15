//0_interfaces/http/controller/httpServer
import Router from '@koa/router'; 
import logger from 'koa-logger';
import Koa, { type Context } from 'koa';
import serve from 'koa-static';
import path from 'path';
import bodyParser from 'koa-bodyparser';

import { InMemoryMealEntryRepository } from '../../3_infrastructure/inMemoryMealEntryRepository';
import { LogMealEntry } from '../../1_application/logMealEntry';

import { MealEntryController } from './controller/mealEntryController';
import { GetAllPublicMealEntries } from '../../1_application/getAllPublicMealEntries';
import { GetAllMealEntries } from '../../1_application/getAllMealEntries';
import { GetMealEntryById } from '../../1_application/getMealEntryById';
import { UpdateMealEntry } from '../../1_application/updateMealEntry';

export function startServer(): void {
  const app = new Koa();
  const router = new Router(); 
  const publicDir = path.join(__dirname, '../../view'); 

  const mealEntryRepository = new InMemoryMealEntryRepository();
  const logMealEntry = new LogMealEntry(mealEntryRepository);
  const getAllPublicMealEntries = new GetAllPublicMealEntries(mealEntryRepository);
  const getAllMealEntries = new GetAllMealEntries(mealEntryRepository);
  const getMealEntryById = new GetMealEntryById(mealEntryRepository);
  const updateMealEntries = new UpdateMealEntry(mealEntryRepository);
  const mealEntryController = new MealEntryController(logMealEntry, getAllPublicMealEntries, getAllMealEntries, getMealEntryById, updateMealEntries);
  
  //config dir
  app.use(serve(publicDir));
  
  // middleware and routes
  app.use(logger());
  app.use(bodyParser({
    enableTypes: ['json', 'form'],
  }));
  app.use(router.routes()).use(router.allowedMethods());

  // Hello
   const helloWorld = (ctx: Context) => {
    ctx.type = 'html';
    ctx.body = `Hello World!! </br>
                <a href="/view/add-meal-entry-form">1. Log my meal entry</a></br>
                <a href="/meal-entries/public">2. View Public Meal Entries</a></br>
                <a href="/meal-entries">3. View all my meal entries</a></br>
                <a href="/view/update-meal-entry-form/:id">4. Update my meal entries</a></br>
                <a href="/view/tabata">5. More about me and my technical decisions</a></br>`;
    };

  router.get('/', helloWorld);
  
  // 1. New Meal
  router.get('/view/add-meal-entry-form', mealEntryController.showMealEntryForm.bind(mealEntryController));
  router.post('/meal-entries', mealEntryController.addMealEntry.bind(mealEntryController));  

  // 2. View Public Meal Entries
  router.get('/meal-entries/public', mealEntryController.getAllPublic.bind(mealEntryController));
  
  // 3. View all my meal entries
  router.get('/meal-entries', mealEntryController.getAll.bind(mealEntryController));
  router.get('/meal-entries/:id', mealEntryController.getById.bind(mealEntryController));

  // 4. Update my meal entries
  router.get('/view/update-meal-entry-form/:id', mealEntryController.serveUpdateForm.bind(mealEntryController));
  router.put('/view/update-meal-entry-form/:id', mealEntryController.updateMeal.bind(mealEntryController));


  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}
