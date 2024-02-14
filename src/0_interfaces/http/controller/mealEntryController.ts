//0_interfaces/http/controller/mealEntryController
import fs from 'fs/promises';
import path from 'path';
import type { Context } from 'koa';
import { LogMealEntry } from '../../../1_application/logMealEntry';
import { GetAllPublicMealEntries } from '../../../1_application/getAllPublicMealEntries';
import { GetAllMealEntries } from '../../../1_application/getAllMealEntries';
import { UpdateMealEntry } from '../../../1_application/updateMealEntry';
import type { MealEntry } from '../../../2_domain/mealEntry';
import type { MealEntryData } from '../../../2_domain/MealEntryData';


export class MealEntryController {
  constructor(
    private logMealEntry: LogMealEntry,
    private getAllPublicMealEntries: GetAllPublicMealEntries,
    private getAllMealEntries: GetAllMealEntries,
    private updateMealEntry : UpdateMealEntry
    ) {}


  // 1. New Meal
  public async showMealEntryForm(ctx: Context): Promise<void> {
    const filePath = path.join(process.cwd(), 'src/0_interfaces/view/meal-entry-form.html');
  
    try {
      const fileContents = await fs.readFile(filePath, 'utf8');
      ctx.type = 'html';
      ctx.body = fileContents;
    } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.body = "Error loading the meal entry form";
    }
  }
  
  public async addMealEntry(ctx: Context): Promise<void> {
    console.log("detail:", ctx.request.body.userId, ctx.request.body.description, ctx.request.body.timestamp);
    try {
      const mealEntryData: MealEntryData = {
        userId: ctx.request.body.userId,
        description: ctx.request.body.description,
        timestamp: ctx.request.body.timestamp,
      };
      const mealEntry = await this.logMealEntry.execute(mealEntryData);
      ctx.status = 201; 
      ctx.body = { message: 'Meal entry added successfully', mealEntry };
    } catch (error) {
      console.error(error);
      ctx.status = 400;
      ctx.body = { error: (error as Error).message };
    }      
  }

  // 2. View Public Meal Entries
  public async getAllPublic(ctx: Context): Promise<void> {
    const publicMealEntries = await this.getAllPublicMealEntries.execute();
    ctx.body = publicMealEntries;
  }

  // 3. View all my meal entries
  public async getAll(ctx: Context): Promise<void> {
    const mealEntries = await this.getAllMealEntries.execute();
    ctx.body = mealEntries;
  }

  // 4. Update my meal entries
  public async updateMealEntry(ctx: Context): Promise<void> {
    const id = ctx.params.id; 
    const mealEntryData = {
      description: ctx.request.body.description,
      userId: ctx.request.body.userId,
      timestamp: ctx.request.body.timestamp
    };
    // const mealEntryToUpdate = this.mealEntryRepository.find(id);
  
    // if (!mealEntryToUpdate) {
    //   ctx.status = 404;
    //   ctx.body = { error: 'Meal entry not found' };
    //   return;
    // }
  
    // const now = new Date();
    // const oneMinuteAgo = new Date(now.getTime() - 60000);
  
    // if (mealEntryToUpdate.timestamp < oneMinuteAgo) {
    //   ctx.status = 403;
    //   ctx.body = { error: 'Meal entry is read only after the first minute' };
    //   return;
    // }
  

    try {
      const updateMealEntryService = new UpdateMealEntry(this.mealEntryRepository);
      const updatedMealEntry = await updateMealEntryService.execute(id, mealEntryData);
      ctx.status = 200;
      ctx.body = { message: 'Meal entry updated successfully', mealEntry: updatedMealEntry };
    } catch (error) {
      ctx.status = 400;
      ctx.body = { error: error.message };
    }
  }

}
