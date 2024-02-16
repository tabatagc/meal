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
  
  //config dir
  const publicDir = path.join(__dirname, '../../0_interfaces/view');
  console.log(`Serving static files from: ${publicDir}`);
  app.use(serve(publicDir));
  
  const router = new Router(); 

  const mealEntryRepository = new InMemoryMealEntryRepository();
  const logMealEntry = new LogMealEntry(mealEntryRepository);
  const getAllPublicMealEntries = new GetAllPublicMealEntries(mealEntryRepository);
  const getAllMealEntries = new GetAllMealEntries(mealEntryRepository);
  const getMealEntryById = new GetMealEntryById(mealEntryRepository);
  const updateMealEntries = new UpdateMealEntry(mealEntryRepository);
  const mealEntryController = new MealEntryController(logMealEntry, getAllPublicMealEntries, getAllMealEntries, getMealEntryById, updateMealEntries);
  
  // middleware and routes
  app.use(logger());
  app.use(bodyParser({
    enableTypes: ['json', 'form'],
  }));
  app.use(router.routes()).use(router.allowedMethods());

  // 0. Home && Tabata Page
  router.get('/', mealEntryController.serveMealEntriesPage.bind(mealEntryController));
  router.get('/tabata', mealEntryController.tabataPage.bind(mealEntryController));
  
  // 1. New Meal
  router.get('/add-meal-entry-form', mealEntryController.showMealEntryForm.bind(mealEntryController));
  router.post('/meal-entries', mealEntryController.addMealEntry.bind(mealEntryController));  

  // 2. View Public Meal Entries
  router.get('/meal-entries/public', mealEntryController.getAllPublic.bind(mealEntryController));
  
  // 3. View all my meal entries
  router.get('/meal-entries', mealEntryController.getAll.bind(mealEntryController));
  router.get('/meal-entries/:id', mealEntryController.getById.bind(mealEntryController));

  // 4. Update my meal entries
  router.get('/update-meal-entry-form/:id', mealEntryController.serveUpdateForm.bind(mealEntryController));
  router.put('/update-meal-entry-form/:id', mealEntryController.updateMeal.bind(mealEntryController));


  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}
