//0_interfaces/http/controller/mealEntryController
import { promises as fs } from 'fs';
import path from 'path';
import type { Context } from 'koa';
import { LogMealEntry } from '../../../1_application/logMealEntry';
import { GetAllPublicMealEntries } from '../../../1_application/getAllPublicMealEntries';
import { GetAllMealEntries } from '../../../1_application/getAllMealEntries';
import { GetMealEntryById } from '../../../1_application/getMealEntryById';
import { UpdateMealEntry } from '../../../1_application/updateMealEntry';
import type { MealEntryData } from '../../../2_domain/MealEntryData';
import type { MealEntry } from '../../../2_domain/mealEntry';


export class MealEntryController {
  constructor(
    private logMealEntryApplication: LogMealEntry,
    private getAllPublicMealEntriesApplication: GetAllPublicMealEntries,
    private getAllMealEntriesApplication: GetAllMealEntries,
    private getMealEntryByIdApplication: GetMealEntryById,
    private updateMealEntryApplication : UpdateMealEntry
    ) {}

  // 0. Home
  public async serveMealEntriesPage(ctx: Context): Promise<void> {
    const filePath = path.join(process.cwd(), 'src/0_interfaces/view/index.html');
  
    try {
      const fileContents = await fs.readFile(filePath, 'utf8');
      ctx.type = 'html';
      ctx.body = fileContents;
    } catch (error) {
      console.error('Error reading the meal entries list file:', error);
      ctx.status = 500;
      ctx.body = 'Internal Server Error';
    }
  }

  public async tabataPage(ctx: Context): Promise<void> {
    const filePath = path.join(process.cwd(), 'src/0_interfaces/view/tabata.html');
  
    try {
      const fileContents = await fs.readFile(filePath, 'utf8');
      ctx.type = 'html';
      ctx.body = fileContents;
    } catch (error) {
      console.error('Error reading the meal entries list file:', error);
      ctx.status = 500;
      ctx.body = 'Internal Server Error';
    }
  }
  
  // 1. New Meal
  public async showMealEntryForm(ctx: Context): Promise<void> {
    const filePath = path.join(process.cwd(), 'src/0_interfaces/view/add-meal-entry-form.html');
  
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
    try {
      const isPublic = ctx.request.body.isPublic === 'true';

      const mealEntryData: MealEntryData = {
        userId: ctx.request.body.userId,
        description: ctx.request.body.description,
        timestamp: ctx.request.body.timestamp,
        isPublic: ctx.request.body.isPublic
      };
      const mealEntry = await this.logMealEntryApplication.execute(mealEntryData);
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
    const publicMealEntries = await this.getAllPublicMealEntriesApplication.execute();
    ctx.body = publicMealEntries;
  }

  // 3. View all my meal entries
  public async getAll(ctx: Context): Promise<void> {
    const mealEntries = await this.getAllMealEntriesApplication.execute();
    ctx.body = mealEntries;
  }
  
  public async getById(ctx: Context): Promise<void> { 
    try {
      const id = ctx.params.id;
      const mealEntry = await this.getMealEntryByIdApplication.execute(id);
      if (!mealEntry) {
        ctx.status = 404;
        ctx.body = { error: 'Meal entry not found' };
        return;
      }
      ctx.body = mealEntry;
    } catch (error) {
      console.error(error);
      ctx.status = 400;
      ctx.body = { error: (error as Error).message };
    }
  }

  // 4. Update my meal entries
  public async serveUpdateForm(ctx: Context): Promise<void> {
    const id = ctx.params.id;
    try {
      const mealEntry = await this.getMealEntryByIdApplication.execute(id);
      if (!mealEntry) {
        ctx.status = 404;
        ctx.body = { error: 'Meal entry not found' };
        return;
      }
      
      const filePath = path.join(process.cwd(), 'src/0_interfaces/view/update-meal-entry-form.html');
      const fileContents = await fs.readFile(filePath, 'utf8');
      
      let filledForm = fileContents
        .replace('<!--ID-->', id)
        .replace('<!--DESCRIPTION-->', mealEntry.description)
        .replace('<!--USERID-->', mealEntry.userId)
        .replace('<!--TIMESTAMP-->', mealEntry.timestamp.toISOString().slice(0, 16))
        .replace('<!--ISPUBLICCHECKED-->', mealEntry.isPublic ? 'checked' : '');
  
      ctx.type = 'html';
      ctx.body = filledForm;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Error loading the update meal entry form' };
    }
  }

  public async updateMeal(ctx: Context): Promise<void> {
    const id = ctx.params.id; 
    const mealEntryData = {
      description: ctx.request.body.description,
      userId: ctx.request.body.userId,
      timestamp: ctx.request.body.timestamp,
      isPublic: ctx.request.body.isPublic
    };
    
    try {
      const updatedMealEntry = await this.updateMealEntryApplication.execute(id, mealEntryData);
      ctx.status = 200;
      ctx.body = { message: 'Meal entry updated successfully', mealEntry: updatedMealEntry };
    } 
    catch (error) 
    {
      ctx.status = 500;
      if (error instanceof Error) {
        ctx.body = { error: error.message };
      } else {
        ctx.body = { error: 'An unknown error occurred' };
      }
    }
  }

}
