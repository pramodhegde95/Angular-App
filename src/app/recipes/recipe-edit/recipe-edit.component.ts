import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params, Router} from '@angular/router';
import {FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import  {RecipeService} from '../recipe.service';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode=false;
  recipeForm: FormGroup;
  constructor(private router: Router,
  private route:ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
  this.route.params
  .subscribe(
  (params: Params) => {
  this.id=+params['id'];
  this.editMode= params['id'] != null;
  this.initForm();
  });
  }

  onDeleteIngredient(index: number){
  (<FormArray>this.recipeForm.get('ingredient')).removeAt(index);
  }

  onSubmit(){
  if(this.editMode){
    this.recipeService.updateRecipe(this.id,this.recipeForm.value)
  }else{
    this.recipeService.addRecipe(this.recipeForm.value);
  }
  this.onCancel();
  }

  onCancel(){
  this.router.navigate(['../'],
  {relativeTo:this.route});
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredient')).push(
      new FormGroup({
        'name':new FormControl(null, Validators.required),
        'amount':new FormControl(null, [Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  private initForm(){
  let recipeName='';
  let recipeImagePath='';
  let recipeDescription='';
  let recipeIngredients = new FormArray([]);''

  if(this.editMode){
    const recipe=this.recipeService.getRecipeID(this.id);
    recipeName=recipe.name;
    recipeImagePath=recipe.imagePath;
    recipeDescription=recipe.description;

    if(recipe['ingredients']){
      for(let ingredient of recipe.ingredient){
        recipeIngredients.push(
        new FormGroup({
        'name':new FormControl(ingredient.name),
        'amount':new FormControl(ingredient.amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
        })
        );
    }
   }
  }

  this.recipeForm=new FormGroup({
  'name': new FormControl(recipeName, Validators.required),
  'imagePath':new FormControl(recipeImagePath, Validators.required),
  'description':new FormControl(recipeDescription, Validators.required),
  'ingredient': recipeIngredients
  });

 }
}
