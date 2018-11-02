import { Injectable } from '@angular/core';
import { Recipe } from './recipes.model'; 
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [
    new Recipe(
      'Tiramisu layered cake',
      'Using a box cake mix as a base its a real time saver',
      'https://images.media-allrecipes.com/userphotos/600x600/4443088.jpg',
      [
        new Ingredient('coffee powder',1),
        new Ingredient('coffee',1/4),
        new Ingredient('cheese',1)
      ]),
    new Recipe(
      'Pumpkin Cake',
      'This recipe uses pumpkin puree in a cake batter ',
      'https://images.media-allrecipes.com/userphotos/600x600/521249.jpg',
      [
        new Ingredient('vegeable oil', 1),
        new Ingredient('eggs', 3),
        new Ingredient('vanilla', 1)
      ])
  ];

  getRecipe() {
    return this.recipes.slice();
  }

  getRecipeID(index:number){
  return this.recipes[index];
  }

  addIngredientToShoppingList(ingredient: Ingredient[]) {
    this.slService.addIngredients(ingredient);
  }

  setRecipe(recipes: Recipe[]){
  this.recipes=recipes;
  this.recipeChanged.next(this.recipes.slice());
  }
  addRecipe(recipe: Recipe){
  this.recipes.push(recipe);
  this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
  this.recipes[index]=newRecipe;
  this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
  this.recipes.splice(index,1);
  this.recipeChanged.next(this.recipes.slice());
  }

  constructor(private slService: ShoppingListService) {
  }
}
