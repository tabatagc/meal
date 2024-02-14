//0_interfaces/http/controller/mealEntryController
import type { Context } from 'koa';
import { GetAllMealEntries } from '../../../1_application/getAllMealEntries';
import { GetAllPublicMealEntries } from '../../../1_application/getAllPublicMealEntries';
import { LogMealEntry } from '../../../1_application/logMealEntry';

export class MealEntryController {
  constructor(
    private getAllMealEntries: GetAllMealEntries,
    private getAllPublicMealEntries: GetAllPublicMealEntries,
    private logMealEntry: LogMealEntry
    ) {}

  public async getAll(ctx: Context): Promise<void> {
    const mealEntries = await this.getAllMealEntries.execute();
    ctx.body = mealEntries;
  }

  public async getAllPublic(ctx: Context): Promise<void> {
    const publicMealEntries = await this.getAllPublicMealEntries.execute();
    ctx.body = publicMealEntries;
  }
  
  //New Entry Meal Form
  public async showMealEntryForm(ctx: Context): Promise<void> {
    const path = require('path');
    const fs = require('fs').promises; 

    const filePath = path.join(__dirname, '../../../view/meal-entry-form.html');

    try {
        const fileContents = await fs.readFile(filePath, 'utf8');
        ctx.type = 'html';
        ctx.body = fileContents;
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Error loading the meal entry form";
    }
  }

  
  public async addMealEntry(ctx: Context): Promise<void> {
    const mealEntryData = ctx.request.body;
    const mealEntry = await this.logMealEntry.execute(mealEntryData);
    ctx.redirect('/'); 
  }
}
