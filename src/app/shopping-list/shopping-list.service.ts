import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('apple', 4),
    new Ingredient('banana', 5),
  ];

  getIngredient() {
    return this.ingredients; 
  }

  getIngredients(index:number){
  return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    return this.ingredients.push(ingredient);
  }

  updateIngredient(index: number, newIngredient: Ingredient){
  this.ingredients[index]=newIngredient;
  }

  addIngredients(ingredient: Ingredient[]) {
    this.ingredients.push(...ingredient); 
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index,1);
  }
}
