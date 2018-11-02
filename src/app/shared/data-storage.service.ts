import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {map} from 'rxjs/operators';
import {Recipe} from '../recipes/recipes.model'

@Injectable()
export class DataStorageService{

constructor(private http:Http, private recipeService: RecipeService){
}

storeRecipe(){
return this.http.put('https://ng-recipe-book-79979.firebaseio.com/recipes.json',
this.recipeService.getRecipe());
}

getRecipe(){
  this.http.get('https://ng-recipe-book-79979.firebaseio.com/recipes.json')
  .pipe(map(
  (res: Response)=>{
  const recipes: Recipe[] =res.json();
  for(let recipe of recipes){
    if(!recipe['ingredients']){
      recipe['ungredient']=[];
    }
  }
  return recipes;
  }
  ))
  .subscribe(
  (recipes: Recipe[])=>{
  this.recipeService.setRecipe(recipes);
  }
  );
}
}
