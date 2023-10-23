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
  /* HttpClient for http requests */
  /* shared service for gloabal variables */
  constructor(private http: HttpClient, private sharedService: SharedService) {}
  
  inputValue: string = '';
  ingredients: Ingredient[] = [];
  apiKey = environment.apiKey;

  ingredientsList: string[] = this.sharedService.ingredientList;
  recipes: any = []

  menuListOpen: boolean = false

  onInputChange() {
    /* autocomplete ingredient search */
    this.http
      .get<Ingredient[]>(
        `https://api.spoonacular.com/food/ingredients/autocomplete?query=${this.inputValue}&number=5&apiKey=${this.apiKey}`
      )
      .subscribe((res) => (this.ingredients = res));

  }

  /* getting recipe from choosen ingredients */
  onSubmit() {
    this.menuListOpen = !this.menuListOpen
    /* creates url for recipe request */
    const ingredientsList = this.ingredientsList
      .map((ingredient, index) => {
        return index === 0 ? ingredient : `,+${ingredient}`;
      })
      .join('')
      /* remove spaces */
      .replace(/\s+/g, ''); 
      console.log(ingredientsList)
    this.http.get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsList}&number=5&apiKey=${this.apiKey}`
    ).subscribe((res) => (this.recipes = res))
    
  }

  
}
