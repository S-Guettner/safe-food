import { Component } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../types/ingredient.model';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'],
})
export class IngredientsComponent {
  constructor(private http: HttpClient, private sharedService: SharedService) {}
  inputValue: string = '';
  ingredients: Ingredient[] = [];
  apiKey = environment.apiKey;

  ingredientsList: string[] = this.sharedService.ingredientList;
  recipe: any = []

  onInputChange() {
    this.http
      .get<Ingredient[]>(
        `https://api.spoonacular.com/food/ingredients/autocomplete?query=${this.inputValue}&number=5&apiKey=${this.apiKey}`
      )
      .subscribe((res) => (this.ingredients = res));

  }
  private logrecipe() {
    console.log(this.recipe);
  }

  onSubmit() {
    const ingredientsList = this.ingredientsList
      .map((ingredient, index) => {
        return index === 0 ? ingredient : `,+${ingredient}`;
      })
      .join('')
      .replace(/\s+/g, ''); 
      console.log(ingredientsList)
    this.http.get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsList}&number=5&apiKey=${this.apiKey}`
    ).subscribe((res) => (this.recipe = res))
    this.logrecipe();
  }
}
